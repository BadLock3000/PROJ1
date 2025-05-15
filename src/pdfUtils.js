import { fonts } from "./fonts/fonts";
import pdfMake from "pdfmake/build/pdfmake";
pdfMake.vfs = fonts; // Используем шрифты из fonts.js
pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
  },
};
export const downloadUserResultsPDF = (userResults) => {
  const documentDefinition = {
    content: [
      {
        text: `Результаты лабораторных работ: ${userResults[0].display_name}`,
        style: "header",
      },
      ...userResults.map((result) => ({
        text: [
          `Предмет: ${result.subject}\n`,
          `Лабораторная работа: ${result.lab_number}\n`,
          `Результат: ${result.result}\n`,
          `Дата выполнения: ${new Date(result.created_at).toLocaleString()}\n`,
        ],
        style: "body",
      })),
    ],
    styles: {
      header: {
        fontSize: 18,

        margin: [0, 0, 0, 10],
      },
      body: {
        fontSize: 12,
        margin: [0, 0, 0, 10],
      },
    },
    defaultStyle: {
      font: "Roboto", // Используем шрифт Roboto
    },
  };

  // Создаем и скачиваем PDF
  pdfMake
    .createPdf(documentDefinition)
    .download(`lab_results_${userResults[0].username}.pdf`);
};
