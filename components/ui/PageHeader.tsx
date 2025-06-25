interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          {title}
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto animate-slide-up">
          {description}
        </p>
      </div>
    </div>
  );
}