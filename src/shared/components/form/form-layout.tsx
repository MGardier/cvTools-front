interface IFormLayoutProps {
  children: React.ReactNode;
}

export const FormLayout = ({ children }: IFormLayoutProps) => {
  return (
    <div className="container mx-auto py-10 flex flex-col justify-center items-center">
      {children}
    </div>
  );
};
