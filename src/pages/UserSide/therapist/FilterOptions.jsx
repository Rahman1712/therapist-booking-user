import { useState, useEffect } from 'react';
import languagesData from "../../../constants/languages.json";
import times from "../../../constants/times.json";
import { therapistsAxiosApi } from "../../../config/axiosConfig";
import { THERAPIST_PUBLIC_API } from '../../../constants';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Select from 'react-select'

const FilterOptions = () => {
  const [showSpecializations, setShowSpecializations] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const languageNames = languagesData.map((language) => ({
    label: language.name,
    value: language.name,
  }));

  useEffect(() => {
    therapistsAxiosApi
      .get(THERAPIST_PUBLIC_API + "/all-categories")
      .then((response) => {
        // const categoriesNames = response.data.map((category) => category.name);
        const categoriesNames = response.data.map((category) => ({
          label: category.name,
          value: category.name,
        }));
        setCategories(categoriesNames);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  const handleLanguageSelectChange = (selectedOptions) => {
    const selectedLanguageValues = selectedOptions.map((option) => option.value);
  }
  const handleTimesSelectChange = (selectedOptions) => {
    const selectedTimesValues = selectedOptions.map((option) => option.value);
    setSelectedTimes(selectedTimesValues);
  }
  const handleCategorySelectChange = (selectedOptions) => {
    const selectedCategoryValues = selectedOptions.map((option) => option.value);
  }


  const specializations = ['Psychologist', 'Marriage Counselor', 'Therapist', 'Social Worker'];

  const handleSpecializationSelect = (specialization) => {
    setSelectedSpecialization(specialization);
    setShowSpecializations(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date.$d).format('YYYY-MM-DD'));
  }

  return (
    <div className="min-w-full container mx-auto p-6 pl-10 
    bg-gradient-to-r from-blue-50 via-blue-50 to-indigo-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-400">

      <div className="mb-4 text-gray-800 dark:text-white">
        <h2 className="text-xl font-semibold">Filter</h2>
      </div>

      <div className="flex flex-wrap items-center  space-x-2">
        <div className="relative">
          <label htmlFor="specializations" className="block text-gray-700 dark:text-white text-sm font-semibold">
            Specializations
          </label>
          <div className="relative">
            <Select
              isMulti
              name="categories"
              options={categories}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleCategorySelectChange}
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="dates" className="block text-gray-700 dark:text-white text-sm font-semibold">
            Date
          </label>
          <div className="relative">
            <div className="right-col" style={{ flex: '1' }}>
              {/* Date and time selector on the right */}
              <div className="mb-4">
                <div className="static-date-picker-container">
                  <DatePicker
                    format="YYYY-MM-DD"
                    minDate={dayjs(new Date())}
                    defaultValue={dayjs(new Date())}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="relative">
          <label htmlFor="timeSlots" className="block text-gray-700 dark:text-white text-sm font-semibold">
            Time Slots
          </label>
          <Select
            isMulti
            name="selectedTimes"
            options={times}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleTimesSelectChange}
          />
        </div>

        <div className="relative">
          <label htmlFor="languages" className="block text-gray-700 dark:text-white text-sm font-semibold">
            Languages
          </label>
          <Select
            isMulti
            name="languages"
            options={languageNames}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleLanguageSelectChange}
          />
        </div>

        <div className="relative">
          <label htmlFor="nameSearch" className="block text-gray-700 dark:text-white text-sm font-semibold">
            Search by name
          </label>
          <input
            type="text"
            id="nameSearch"
            placeholder="Search by name"
            className="p-2 border rounded w-50 dark:bg-gray-800 dark:border-gray-600 bg-white border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
