import React, { useEffect, useState } from "react";
import InputField from "../../common/fields/InputField";
import { useForm } from "react-hook-form";
import ImageField from "../../common/fields/ImageField";
import {
  createAppPopUp,
  getAppPopUp,
  getAppPopupImage,
} from "../../redux/features/sliders";
import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";

const AppPopUp = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [appPopupType, setAppPopupType] = useState("image");
  const [isLoading, setIsLoading] = useState(false);
  const [ytLInk, setYTLink] = useState();
  const [popUpData, setPopUpData] = useState();
  const [imageURL, setImageURL] = useState();

  const getExistingData = () => {
    dispatch(
      getAppPopUp((success, data) => {
        if (success) {
          setPopUpData(data);
          if (data.title) {
            dispatch(
              getAppPopupImage(data.title, (url) => {
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

  useEffect(() => {
    if (popUpData) {
      console.log(popUpData);
      setAppPopupType(popUpData.type);
      setYTLink(popUpData.youtubeLink);
      reset({
        appTitle: popUpData.tagTitle,
      });
    }
  }, [popUpData]);

  const convertToPlainText = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    const plainText = tempElement.textContent || tempElement.innerText || "";

    // Get the first word after trimming any leading/trailing spaces
    const firstWord = plainText.trim().split(" ")[0];
    return firstWord;
  };

  const onAppPopUpSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    const normalTitle = convertToPlainText(data?.appTitle);
    const formData = new FormData();
    formData.append("title", normalTitle);
    formData.append("tagTitle", data.appTitle);
    if (appPopupType === "image") {
      formData.append("file", data.appImage[0].file);
      formData.append("type", appPopupType);
    }
    if (appPopupType === "video") {
      formData.append("youtubeLink", data.youtubeLink);
      formData.append("type", appPopupType);
    }
    dispatch(
      createAppPopUp(
        { formData },
        (success) => {
          if (success) {
            getExistingData();
          }
        },
        setIsLoading
      )
    );
    appReset({
      appTitle: "",
      appImage: "",
      youtubeLink: "",
    });
  };

  return (
    <div>
      <div className="mt-4 p-3 rounded-lg bg-gray-100">
        <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
          App Installation Discount
        </h2>
        <div className="flex gap-x-2 mb-2">
          <p
            className={`bg-gray-300 px-3 rounded-xl cursor-pointer border-2 border-gray-300 ${
              appPopupType === "image"
                ? "!bg-[#1f437f38] text-[#1f437f] border-[#1f437f]"
                : ""
            }`}
            onClick={() => setAppPopupType("image")}
          >
            Image
          </p>
          <p
            className={`bg-gray-300 px-3 rounded-xl cursor-pointer border-2 border-gray-300 ${
              appPopupType === "video"
                ? "!bg-[#1f437f38] text-[#1f437f] border-[#1f437f]"
                : ""
            }`}
            onClick={() => setAppPopupType("video")}
          >
            Video
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onAppPopUpSubmit)}>
            <div className="mb-3">
              <InputField
                type="textEditor"
                control={control}
                errors={errors}
                label="Pop Up text"
                name="appTitle"
              />
            </div>
            {appPopupType === "image" && (
              <div>
                {imageURL && <img src={imageURL} width={200} />}

                <ImageField
                  control={control}
                  errors={errors}
                  name="appImage"
                  maxFiles={1}
                  label="Select Image"
                />
              </div>
            )}
            {appPopupType === "video" && (
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
              className="primary-gradient mt-4 mb-4 text-white capitalize"
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppPopUp;
