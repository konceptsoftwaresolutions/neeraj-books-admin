import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePath from "../../hooks/usePath";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTestimonial,
  getAllTestimonials,
} from "../../redux/features/testimonials";
import axios from "axios"; // Import Axios for API requests
import createAxiosInstance from "../../config/axiosConfig";
import { Star } from "lucide-react"; // Import Star icon
import { MdDelete } from "react-icons/md";

const Testimonials = () => {
  const axiosInstance = createAxiosInstance();

  const dispatch = useDispatch();
  const path = usePath();
  const navigate = useNavigate();

  const [images, setImages] = useState({}); // Store images for each testimonial

  useEffect(() => {
    dispatch(getAllTestimonials());
  }, [dispatch]);

  const { allTestimonials } = useSelector((state) => state.testimonial);

  // Fetch images for each testimonial
  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};
      await Promise.all(
        allTestimonials.map(async (item) => {
          try {
            const response = await axiosInstance.post(
              "/testimonial/getImage",
              { testimonialId: item._id },
              { responseType: "blob" } // Fetch as blob to handle images
            );
            newImages[item._id] = URL.createObjectURL(response.data); // Convert blob to URL
          } catch (error) {
            console.error("Error fetching image for", item._id, error);
          }
        })
      );
      setImages(newImages);
    };

    if (allTestimonials?.length > 0) {
      fetchImages();
    }
  }, [allTestimonials]);

  const handleTestimonialDelete = (data) => {
    console.log(data);
    const payload = {
      _id: data,
    };
    dispatch(deleteTestimonial(payload));
  };

  return (
    <PageCont>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <Heading text="All Testimonials" />
        <Button
          className="bg-cstm-blue flex justify-center items-center"
          onClick={() => path.changeEndPoint("addtestimonial")}
        >
          <Plus className="pr-1" />
          Add New
        </Button>
      </div>

      <div className="mt-4">
        {allTestimonials?.map((item) => (
          <div
            key={item._id}
            className="w-full flex justify-between border p-3 mb-3"
          >
            <div className="flex items-center">
              {/* Image */}
              <img
                src={images[item._id] || "/default-image.jpg"} // Show fetched image or default
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover mr-3"
              />
              <div>
                <div className="flex items-center">
                  <span className="text-sm font-semibold">{item.name}</span>
                  <span className="text-sm ml-3">{item.designation}</span>
                  <div className="flex ml-3">
                    {Array.from({ length: item.rating }, (_, index) => (
                      <Star
                        key={index}
                        size={16}
                        fill="currentColor"
                        color="#fbc02d"
                      />
                    ))}
                  </div>
                </div>
                <div>{item.paragraph}</div>
              </div>
            </div>
            <div className="cursor-pointer">
              <MdDelete
                size={20}
                color="red"
                onClick={() => handleTestimonialDelete(item._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </PageCont>
  );
};

export default Testimonials;
