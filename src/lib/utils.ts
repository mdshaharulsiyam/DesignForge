// import jsPDF from "jspdf";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import circle from '@/assets/circle.svg'
import triangle from '@/assets/triangle.svg'
import line from '@/assets/line.svg'
import text from '@/assets/text.svg'
import image from '@/assets/image.svg'
import freeform from '@/assets/freeform.svg'
import rectangle from '@/assets/rectangle.svg'
const adjectives = [
  "Happy",
  "Creative",
  "Energetic",
  "Lively",
  "Dynamic",
  "Radiant",
  "Joyful",
  "Vibrant",
  "Cheerful",
  "Sunny",
  "Sparkling",
  "Bright",
  "Shining",
];

const animals = [
  "Dolphin",
  "Tiger",
  "Elephant",
  "Penguin",
  "Kangaroo",
  "Panther",
  "Lion",
  "Cheetah",
  "Giraffe",
  "Hippopotamus",
  "Monkey",
  "Panda",
  "Crocodile",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomName(): string {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  return `${randomAdjective} ${randomAnimal}`;
}

export const getShapeInfo = (shapeType: string) => {
  switch (shapeType) {
    case "rect":
      return {
        icon: "@/assets/rectangle.svg",
        name: "Rectangle",
      };

    case "circle":
      return {
        icon: circle,
        name: "Circle",
      };

    case "triangle":
      return {
        icon: triangle,
        name: "Triangle",
      };

    case "line":
      return {
        icon: line,
        name: "Line",
      };

    case "i-text":
      return {
        icon: text,
        name: "Text",
      };

    case "image":
      return {
        icon: image,
        name: "Image",
      };

    case "freeform":
      return {
        icon: freeform,
        name: "Free Drawing",
      };

    default:
      return {
        icon: rectangle,
        name: shapeType,
      };
  }
};

// export const exportToPdf = () => {
//   const canvas = document.querySelector("canvas");

//   if (!canvas) return;

//   // use jspdf
//   // const doc = new jsPDF({
//   //   orientation: "landscape",
//   //   unit: "px",
//   //   format: [canvas.width, canvas.height],
//   // });

//   // get the canvas data url
//   const data = canvas.toDataURL();

//   // add the image to the pdf
//   doc.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);

//   // download the pdf
//   doc.save("canvas.pdf");
// };
