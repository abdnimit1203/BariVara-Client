import { useState, useEffect } from 'react';

const Clock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('bn-BD',options);
  };

  return (
    <div className="flex flex-col items-center justify-center lg:flex-row ">
      <div className="text-3xl font-bold py-3 rounded-lg shadow-md lg:text-sm lg:py-0">
        {formatTime(now)}
      </div>
<hr className='hidden lg:block p-2 rotate-90' />
      <div className="border-t-2 lg:border-t-0 rounded-lg p-2  text-gray-200">
        {formatDate(now)}
      </div>
    </div>
  );
};

export default Clock;
