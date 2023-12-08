
export const getFirstLetter = (str) => str == null ? null : str.charAt(0).toUpperCase();

export const getRandomHexColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getAvatar = (user, userColors, setUserColors) => {
  if(user){
    if (user.imageUrl) {
      return <img src={user.imageUrl} alt={user.fullname} className="w-8 h-8 rounded-full mr-2" />;
    } else {
      let hexColor;
      if (!userColors[user.userId]) {
        hexColor = getRandomHexColor();
        setUserColors((prevColors) => ({
          ...prevColors,
          [user.userId]: hexColor,
        }));
      } else {
        hexColor = userColors[user.userId];
      }
  
      return (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center  mr-2`}
          style={{ backgroundColor: hexColor, color: '#fff' }}
        >
          {getFirstLetter(user.fullname)}
        </div>
      );
    }
  }
};

export const getAvatarTherapist = (therapist, therapistColors, setTherapistColors) => {
  if(therapist){
    if (therapist.imageUrl) {
      return <img src={therapist.imageUrl} alt={therapist.fullname} className="w-8 h-8 rounded-full mr-2" />;
    } else {
      let hexColor;
      if (!therapistColors[therapist.therapistId]) {
        hexColor = getRandomHexColor();
        setTherapistColors((prevColors) => ({
          ...prevColors,
          [therapist.therapistId]: hexColor,
        }));
      } else {
        hexColor = therapistColors[therapist.therapistId];
      }
  
      return (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center  mr-2`}
          style={{ backgroundColor: hexColor, color: '#fff' }}
        >
          {getFirstLetter(therapist.fullname)}
        </div>
      );
    }
  }
};


export const getTherapistAvatar = (fullname, imageUrl) => {
  if (imageUrl) {
    return <img src={imageUrl} alt={fullname} className="w-8 h-8 rounded-full mr-2" />;
  } else {
    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center  mr-2 text-white bg-cyan-900`}
      >
        {getFirstLetter(fullname)}
      </div>
    );
  }
};


export const getUserAvatar = (fullname, imageUrl) => {
  if (imageUrl) {
    return <img src={imageUrl} alt={fullname} className="w-8 h-8 rounded-full mr-2" />;
  } else {
    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center  mr-2 text-white bg-cyan-900`}
      >
        {getFirstLetter(fullname)}
      </div>
    );
  }
};