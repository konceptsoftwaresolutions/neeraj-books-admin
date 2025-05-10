import React, { useEffect, useState } from "react";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import ImageField from "../../common/fields/ImageField";
import {
  createHomePopUp,
  getHomePopUp,
  getHomePopupImage,
} from "../../redux/features/sliders";
import { useDispatch } from "react-redux";

const HomePopUp = () => {
  const dispatch = useDispatch();

  const [popupType, setPopupType] = useState("image");
  const [isLoading, setIsLoading] = useState(false);
  const [ytLInk, setYTLink] = useState();
  const [popUpData, setPopUpData] = useState();
  const [imageURL, setImageURL] = useState();

  const getExistingData = () => {
    dispatch(
      getHomePopUp((success, data) => {
        if (success) {
          setPopUpData(data);
          if (data.title) {
            dispatch(
              getHomePopupImage(data.title, (url) => {
                if (url) setImageURL(url);
              })
            );
          }
        }
      })
    );
  };

  useEffect(() => {
    getExistingData();
  }, []);

  const convertToPlainText = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    const plainText = tempElement.textContent || tempElement.innerText || "";

    // Get the first word after trimming any leading/trailing spaces
    const firstWord = plainText.trim().split(" ")[0];
    return firstWord;
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (popUpData) {
      setPopupType(popUpData.type);
      setYTLink(popUpData.youtubeLink);
      reset({
        tagTitle: popUpData.tagTitle,
      });
    }
  }, [popUpData]);

  const onsubmit = (data) => {
    setIsLoading(true);
    reset();
    console.log(data);
    const normalTitle = convertToPlainText(data.tagTitle);
    const formData = new FormData();
    formData.append("title", normalTitle);
    formData.append("tagTitle", data.tagTitle);
    if (popupType === "image") {
      formData.append("file", data.popUpBanner[0].file);
      formData.append("type", popupType);
    }
    if (popupType === "video") {
      formData.append("youtubeLink", data.youtubeLink);
      formData.append("type", popupType);
    }
    dispatch(
      createHomePopUp({ formData }, setIsLoading, (success) => {
        if (success) {
          getExistingData();
        }
      })
    );
  };

  return (
    <div>
      <div className="mt-6 p-3 rounded-lg bg-gray-100">
        <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
          Home Popup
        </h2>
        <div className="flex gap-x-2 mb-2">
          <p
            className={`bg-gray-300 px-3 rounded-xl cursor-pointer border-2 border-gray-300 ${
              popupType === "image"
                ? "!bg-[#1f437f38] text-[#1f437f] border-[#1f437f]"
                : ""
            }`}
            onClick={() => setPopupType("image")}
          >
            Image
          </p>
          <p
            className={`bg-gray-300 px-3 rounded-xl cursor-pointer border-2 border-gray-300 ${
              popupType === "video"
                ? "!bg-[#1f437f38] text-[#1f437f] border-[#1f437f]"
                : ""
            }`}
            onClick={() => setPopupType("video")}
          >
            Video
          </p>
        </div>

        {/* <Modal /> */}
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-3">
            <InputField
              type="textEditor"
              control={control}
              errors={errors}
              label="Pop Up text"
              name="tagTitle"
            />
          </div>
          {popupType === "image" && (
            <div>
              {imageURL && <img src={imageURL} width={200} />}
              <ImageField
                control={control}
                errors={errors}
                name={"popUpBanner"}
                maxFiles={1}
                label="Select Image"
              />
            </div>
          )}
          {popupType === "video" && (
            <div>
              {ytLInk && (
                <p>
                  Existing Video Link -{" "}
                  <a
                    href={ytLInk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {ytLInk}
                  </a>
                </p>
              )}

              <InputField
                control={control}
                errors={errors}
                name="youtubeLink"
                maxFiles={1}
                label="Youtube Link"
                type="text"
              />
            </div>
          )}
          <Button
            loading={isLoading}
            type="submit"
            className="primary-gradient mt-4 mb-4 capitalize"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HomePopUp;
