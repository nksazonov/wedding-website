interface TextSectionProps {
  heading: string;
  children: React.ReactNode;
}

export default function TextSection({ heading, children }: TextSectionProps) {
  return (
    <section className="mb-16 bg-white/30 backdrop-blur-sm rounded-lg p-8">
      <h3 className="text-4xl font-semibold text-gray-800 mb-16 text-center font-[Cormorant_Infant]">
        {heading}
      </h3>
      <div className="text-lg text-gray-700 leading-relaxed font-[Inter]">
        {children}
      </div>
    </section>
  );
}
