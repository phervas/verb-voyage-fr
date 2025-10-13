interface QuestionDisplayProps {
  children: React.ReactNode;
  className?: string;
}

export const QuestionDisplay = ({ children, className = "bg-accent/10" }: QuestionDisplayProps) => {
  return (
    <div className={`mb-8 p-6 ${className} rounded-2xl`}>
      {children}
    </div>
  );
};
