import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

export default function Faq() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700 text-white">
      <main className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <h2 className="font-serif font-extrabold text-3xl text-center mb-8 text-white">
          שאלות ותשובות
        </h2>
        <div className="space-y-4">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "gold" }} />}
              className="bg-gradient-to-b from-gray-800 to-gray-700"
            >
              <h3 className="font-semibold text-lg text-white">איך ניתן להזמין?</h3>
            </AccordionSummary>
            <AccordionDetails className="bg-slate-800 text-sm text-gray-200">
              <p>ההזמנה מתבצעת ישירות דרך האתר, בקטגוריית המוצרים שלנו. ניתן לבחור מוצרים, להוסיף לעגלה ולבצע תשלום בקלות.</p>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "gold" }} />}
              className="bg-gradient-to-b from-gray-800 to-gray-700"
            >
              <h3 className="font-semibold text-lg text-white">כמה זמן לוקח למשלוח להגיע?</h3>
            </AccordionSummary>
            <AccordionDetails className="bg-slate-800 text-sm text-gray-200">
              <p>זמני האספקה משתנים בהתאם לאזור המשלוח, לרוב עד 3 ימי עסקים.</p>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "gold" }} />}
              className="bg-gradient-to-b from-gray-800 to-gray-700"
            >
              <h3 className="font-semibold text-lg text-white">האם ניתן להחזיר מוצרים?</h3>
            </AccordionSummary>
            <AccordionDetails className="bg-slate-800 text-sm text-gray-200">
              <p>מכיוון שמדובר במוצרים טריים וקפואים, לא ניתן להחזיר מוצרים לאחר פתיחת האריזה.</p>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "gold" }} />}
              className="bg-gradient-to-b from-gray-800 to-gray-700"
            >
              <h3 className="font-semibold text-lg text-white">מהי מדיניות הכשרות שלכם?</h3>
            </AccordionSummary>
            <AccordionDetails className="bg-slate-800 text-sm text-gray-200">
              <p>כל המוצרים שלנו תחת השגחת כשרות בד"צ בית יוסף, ונבדקים בקפידה כדי לעמוד בסטנדרטים הגבוהים ביותר.</p>
            </AccordionDetails>
          </Accordion>
        </div>
      </main>
    </div>
  );
}
