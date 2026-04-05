import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { RadioButton } from "@/components/RadioButton";
import { Toggle } from "@/components/Toggle";
import { Checkbox } from "@/components/Checkbox";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#333333] border-b border-[#e5e5e5] pb-2"
          style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}>
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function App() {
  const [radio, setRadio] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <main className="min-h-screen bg-[#fafafa] p-8" dir="rtl">
      <div className="max-w-xl mx-auto space-y-10">
        <h1 className="text-2xl font-bold text-[#333333]"
            style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}>
          مكتبة المكونات
        </h1>

        {/* ── Button ── */}
        <Section title="الأزرار — Button">
          <Button variant="solid">التالي</Button>
          <Button variant="bordered">التالي</Button>
          <Button variant="ghost">التالي</Button>
          <Button variant="solid" isDisabled>التالي (معطّل)</Button>
          <div className="flex gap-2">
            <Button variant="solid" size="sm">صغير</Button>
            <Button variant="solid" size="md">متوسط</Button>
            <Button variant="solid" size="lg">كبير</Button>
          </div>
        </Section>

        {/* ── Input ── */}
        <Section title="حقول الإدخال — Input">
          <Input
            label="اسم الحقل"
            placeholder="أدخل اسم الحقل"
            value={inputValue}
            onChange={setInputValue}
            helperText="نص إضافي"
            helperTextEnd="نص إضافي"
          />
          <Input
            label="اسم الحقل"
            placeholder="أدخل اسم الحقل"
            isDisabled
            helperText="نص إضافي"
            helperTextEnd="نص إضافي"
          />
          <Input
            label="اسم الحقل"
            placeholder="أدخل اسم الحقل"
            isInvalid
            errorMessage="هذا الحقل مطلوب"
            helperTextEnd="نص إضافي"
          />
          <Input
            label="رقم الجوال"
            placeholder="أدخل رقم الجوال"
            isPhoneInput
            phoneCode="+966"
            type="tel"
            helperText="نص إضافي"
            helperTextEnd="نص إضافي"
          />
        </Section>

        {/* ── RadioButton ── */}
        <Section title="زر الاختيار — Radio Button">
          <div className="flex items-center gap-6">
            <RadioButton
              checked={radio}
              onChange={setRadio}
              label="غير محدد"
              id="radio-1"
            />
            <RadioButton
              checked={!radio}
              onChange={(v) => setRadio(!v)}
              label="محدد"
              id="radio-2"
            />
          </div>
        </Section>

        {/* ── Toggle ── */}
        <Section title="مفتاح التبديل — Toggle">
          <div className="flex items-center gap-6">
            <Toggle checked={toggle} onChange={setToggle} label="تفعيل" />
            <Toggle checked={!toggle} onChange={(v) => setToggle(!v)} label="تعطيل" />
            <Toggle checked={false} isDisabled label="معطّل" />
          </div>
        </Section>

        {/* ── Checkbox ── */}
        <Section title="مربع الاختيار — Checkbox">
          <div className="flex items-center gap-6">
            <Checkbox checked={checkbox} onChange={setCheckbox} label="غير محدد / محدد" />
            <Checkbox checked={true} label="محدد دائماً" />
            <Checkbox checked={false} isDisabled label="معطّل" />
          </div>
        </Section>
      </div>
    </main>
  );
}
