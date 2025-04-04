import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { Button, slider } from "@material-tailwind/react";
import usePath from "../../hooks/usePath";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createInsideSlider,
  deleteSlider,
  deleteStandardSliderImage,
  getAllSliders,
  getStandardImgSlider,
  getStandardSlider,
} from "../../redux/features/sliders";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ImageField from "../../common/fields/ImageField";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "antd";

const SliderCard = ({ onViewClick, title, id, onSlideDelete }) => {
  return (
    <div className="border p-2 rounded-xl text-center bg-[#fbfcfe] group relative">
      <div className="flex justify-end">
        <Button
          type="button"
          variant="filled"
          onClick={() => onSlideDelete(id)}
          className="text-cstm-blue poppins-font bg-transparent border-none shadow-none p-0 "
        >
          <span className="poppins-font flex items-center gap-1">
            <Tooltip title="Remove">
              <MdDelete size={18} />
            </Tooltip>
          </span>
        </Button>
      </div>

      <p className="text-base text-center py-2">{title}</p>

      <Button
        className="mb-3 bg-cstm-blue"
        onClick={() => {
          onViewClick(id);
        }}
      >
        View
      </Button>
    </div>
  );
};

const Sliders = () => {
  const path = usePath();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const { allSliders } = useSelector((state) => state.slider);
  const [sliderContent, setSliderContent] = useState();
  const [updatedContent, setUpdatedContent] = useState([]);

  useEffect(() => {
    dispatch(getAllSliders());

    dispatch(
      getStandardSlider((call, data) => {
        if (call) {
          setSliderContent(data);
        }
      })
    );

    // dispatch(getStandardImgSlider());
  }, [dispatch]);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedArray = [...sliderContent.content]; // Copy the current slider content

      const promises = sliderContent?.content?.map((item, index) => {
        return new Promise((resolve) => {
          dispatch(
            getStandardImgSlider({ title: item.title }, (imageUrl, title) => {
              // Update the imageUrl in the updatedArray at the correct index
              updatedArray[index] = { ...updatedArray[index], imageUrl };
              resolve(); // Resolve the promise after updating
            })
          );
        });
      });

      // Wait for all images to be fetched and updated in the array
      await Promise.all(promises);

      // Once all images are fetched, update the state with the updated content
      setUpdatedContent(updatedArray);
    };

    if (sliderContent?.content) {
      fetchImages();
    }
  }, [dispatch, sliderContent]);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const handleViewClick = (id) => {
    // Change the path when the "View" button is clicked
    navigate(`/${role}/editslider`, { state: { _id: id } });
  };

  const handleSlideDelete = (sliderId) => {
    dispatch(deleteSlider(sliderId));
  };

  const sliderSubmit = (data) => {
    console.log(data.sliderImages);
    const formData = new FormData();

    data?.sliderImages?.forEach((item, index) => {
      formData.append(`file`, item.file); // Directly append the file
    });
    dispatch(createInsideSlider({ formData }));
  };

  const handleImageDelete = (id) => {
    console.log(id);

    dispatch(
      deleteStandardSliderImage(id, (success) => {
        if (success) {
          console.log("if called");
          dispatch(
            getStandardSlider((call, data) => {
              if (call) {
                setSliderContent(data);
              }
            })
          );
        }
      })
    );
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="All Sliders" />
        </div>
        <Button
          type="submit"
          variant="filled"
          className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue"
          onClick={() => path.changeEndPoint("addslider")}
        >
          <Plus className="pr-1" />
          Add Multiple Slider
        </Button>
      </div>
      <div className=" p-3 rounded-lg bg-gray-100 mt-5">
        <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
          Multiple Slider
        </h2>
        <div className="grid grid-cols-4 gap-6 mt-3">
          {allSliders?.map((slider, index) => (
            <SliderCard
              title={slider.title}
              id={slider._id}
              onViewClick={() => handleViewClick(slider)}
              onSlideDelete={handleSlideDelete}
            />
          ))}
        </div>
        {allSliders?.length <= 0 && (
          <p className="w-full text-center text-xl font-semibold">
            No Sliders Added...
          </p>
        )}
      </div>
      <div>
        <div className="mt-6  p-3 rounded-lg bg-gray-100">
          {/* <Heading text="" backIcon /> */}
          <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
            Standard Slider
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {updatedContent?.map((item, index) => {
              return (
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    // onClick={() => handleImageDelete(index)}
                  />
                  <Tooltip title="Remove">
                    <MdDelete
                      size={30}
                      className="absolute top-1 right-1 text-white cursor-pointer py-1  bg-red-500 hover:shadow-lg rounded-md border-blue-gray-500"
                      onClick={() => handleImageDelete(index)}
                    />
                  </Tooltip>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit(sliderSubmit)} className="mt-3">
            <ImageField
              control={control}
              errors={errors}
              name="sliderImages"
              maxFiles={10}
              label="Upload Image (1200px X 400px)"
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              className="w-full primary-gradient capitalize"
            >
              Create Slider
            </Button>
          </form>
        </div>
      </div>
    </PageCont>
  );
};

export default Sliders;
