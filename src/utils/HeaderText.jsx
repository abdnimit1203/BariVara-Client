// eslint-disable-next-line react/prop-types
const HeaderText = ({ title, subTitle }) => {
  return (
    <div className="bg-white p-4 rounded-md text-center">
      <h1 className="font-bold text-2xl pb-2">{title}</h1>
      <p className="font-semibold text-white py-2 bg-primary">{subTitle}</p>
    </div>
  );
};

export default HeaderText;
