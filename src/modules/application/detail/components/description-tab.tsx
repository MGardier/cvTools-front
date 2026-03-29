interface IDescriptionTabProps {
  description: string;
}

export const DescriptionTab = ({ description }: IDescriptionTabProps) => (
  <div className="max-w-none">
    <div
      className="prose prose-sm prose-slate max-w-none text-slate-600 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </div>
);
