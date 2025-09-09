import jsPDF from 'jspdf';

export const generateFloorPlanPDF = (canvasRef, projectData, walls, doors, windows, perimeterPoints) => {
  const pdf = new jsPDF('landscape', 'mm', 'a4');
  const canvas = canvasRef.current;
  
  if (!canvas) {
    throw new Error('Canvas not found');
  }

  // Заголовок
  pdf.setFontSize(20);
  pdf.text('План дома - Easy House', 20, 20);
  
  // Информация о проекте
  pdf.setFontSize(12);
  pdf.text(`Название: ${projectData.house.title}`, 20, 35);
  pdf.text(`Размеры дома: ${(projectData.house.width * 1000).toFixed(0)}×${(projectData.house.height * 1000).toFixed(0)}мм`, 20, 45);
  pdf.text(`Площадь: ${projectData.house.area}м²`, 20, 55);
  pdf.text(`Участок: ${(projectData.lotSize.width * 1000).toFixed(0)}×${(projectData.lotSize.height * 1000).toFixed(0)}мм`, 20, 65);
  pdf.text(`Дата создания: ${new Date().toLocaleDateString('ru-RU')}`, 20, 75);

  // Статистика
  pdf.text(`Количество стен: ${walls.length}`, 20, 90);
  pdf.text(`Количество дверей: ${doors.length}`, 20, 100);
  pdf.text(`Количество окон: ${windows.length}`, 20, 110);

  // Добавляем изображение плана
  try {
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 20, 120, 250, 150);
  } catch (error) {
    console.error('Error adding canvas to PDF:', error);
    pdf.text('Ошибка при добавлении изображения плана', 20, 130);
  }

  // Легенда
  pdf.setFontSize(10);
  pdf.text('Легенда:', 20, 280);
  pdf.text('🏠 - Дом', 20, 285);
  pdf.text('🧱 - Стены', 50, 285);
  pdf.text('🚪 - Двери', 80, 285);
  pdf.text('🪟 - Окна', 110, 285);

  return pdf;
};

export const downloadPDF = (pdf, filename = 'floor-plan.pdf') => {
  pdf.save(filename);
};

export const getPDFBlob = (pdf) => {
  return pdf.output('blob');
};