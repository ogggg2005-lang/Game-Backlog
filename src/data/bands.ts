import type { Band } from "../types/band";
export const favoriteBands: Band[] = [
  {
    id: 1,
    name: "Safeplanet",
    foundedYear: 2012,
    genre: "Indie Pop / Dream Pop",
    members: [
      { name: "เอ (ร้องนำ/กีตาร์)", image: "/images/bands/A.jpg" },
      { name: "ดอย (กลอง)", image: "/images/bands/Doy.jpg" },
      { name: "ยี่ (เบส)", image: "/images/bands/Yee.jpg" },
    ],
    image: "/images/bands/safeplanet.jpg",
    imagePosition: "top",
    description: "วงดนตรีอินดี้ป็อปกับซาวด์กีตาร์และเมโลดี้ชวนล่องลอย",
  },
  {
    id: 2,
    name: "Dept",
    foundedYear: 2015,
    genre: "Indie Pop / Alternative",
    members: [
      { name: "เบนซ์ (ร้องนำ/กีตาร์)", image: "/images/bands/Banz.jpg" },
      { name: "ลุคหว้า (คีย์บอร์ด/ซินธิไซเซอร์)", image: "/images/bands/Lukwa.jpg" },
    ],
    image: "/images/bands/dept.jpg",
    imagePosition: "top",
    description: "วงดูโอ้อินดี้ป็อปที่มีเอกลักษณ์ด้านการผสมผสานซาวด์สังเคราะห์",
  },
  {
    id: 3,
    name: "Anatomy Rabbit",
    foundedYear: 2015,
    genre: "Dream Pop / Indie Rock",
    members: [
      { name: "โอ๊ค (ร้องนำ/กีตาร์)", image: "/images/bands/Oot.jpg" },
      { name: "ทัช (กลอง)", image: "/images/bands/Tus.jpg" },
    ],
    image: "/images/bands/anatomy_rabbit.jpg",
    imagePosition: "top",
    description: "วงดนตรีดรีมป็อปจากอุดรธานี เจ้าของเพลงขับรถเล่น",
  },
];