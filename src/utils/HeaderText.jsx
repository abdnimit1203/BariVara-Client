// eslint-disable-next-line react/prop-types
const HeaderText = ({ title, subTitle }) => {
  return (
    // <div className="bg-white p-4 text-[#333] rounded-md text-center">
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-10 md:p-14 shadow-2xl border border-blue-500/20 mb-10">
      <h1 className="font-bold text-2xl pb-2 text-center">{title}</h1>
      <p className="font-semibold text-white py-2 bg-primary text-center rounded-lg">{subTitle}</p>
    </div>
  );
};

export default HeaderText;
