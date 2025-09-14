import jsPDF from 'jspdf';

export const generateFloorPlanPDF = (canvasRef, projectData, walls, doors, windows, perimeterPoints) => {
  const pdf = new jsPDF('landscape', 'mm', 'a4');
  const canvas = canvasRef.current;
  
  if (!canvas) {
    throw new Error('Canvas not found');
  }

  // Создаем временный canvas для лучшего качества изображения
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  
  // Увеличиваем разрешение для лучшего качества
  const scale = 2;
  tempCanvas.width = canvas.width * scale;
  tempCanvas.height = canvas.height * scale;
  tempCtx.scale(scale, scale);
  
  // Копируем содержимое оригинального canvas
  tempCtx.drawImage(canvas, 0, 0);

  // Заголовок
  pdf.setFontSize(20);
  pdf.text('Floor Plan - Easy House', 20, 20);
  
  // Информация о проекте в две колонки
  pdf.setFontSize(11);
  // Левая колонка
  pdf.text(`Project: ${projectData.house.title}`, 20, 35);
  pdf.text(`House size: ${(projectData.house.width * 1000).toFixed(0)}x${(projectData.house.height * 1000).toFixed(0)}mm`, 20, 45);
  pdf.text(`Area: ${projectData.house.area}m2`, 20, 55);
  
  // Правая колонка
  pdf.text(`Lot size: ${(projectData.lotSize.width * 1000).toFixed(0)}x${(projectData.lotSize.height * 1000).toFixed(0)}mm`, 150, 35);
  pdf.text(`Walls: ${walls.length} | Doors: ${doors.length} | Windows: ${windows.length}`, 150, 45);
  pdf.text(`Date: ${new Date().toLocaleDateString('en-US')}`, 150, 55);

  // Добавляем изображение плана - большое и по центру
  try {
    const imgData = tempCanvas.toDataURL('image/png', 1.0);
    
    // Размеры для изображения (занимает почти всю страницу)
    const imgWidth = 260;
    const imgHeight = 160;
    const pageWidth = 297; // A4 landscape width
    const imgX = (pageWidth - imgWidth) / 2;
    const imgY = 65; // Позиция сверху
    
    // Добавляем рамку вокруг изображения
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.rect(imgX - 2, imgY - 2, imgWidth + 4, imgHeight + 4);
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);
  } catch (error) {
    console.error('Error adding canvas to PDF:', error);
    pdf.text('Error adding floor plan image', 20, 130);
  }

  return pdf;
};

export const downloadPDF = (pdf, filename = 'floor-plan.pdf') => {
  pdf.save(filename);
};

export const getPDFBlob = (pdf) => {
  return pdf.output('blob');
};