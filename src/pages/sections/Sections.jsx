import React, { useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";

const sectionList = [
  { id: "homepageBanner", label: "Homepage Banner" },
  { id: "testimonials", label: "Testimonials" },
  { id: "sliders", label: "Sliders" },
  { id: "features", label: "Features" },
  { id: "contactSection", label: "Contact Section" },
  // Add more sections as needed
];

const Sections = () => {
  const [visibility, setVisibility] = useState(
    sectionList.reduce((acc, section) => {
      acc[section.id] = true; // visible by default
      return acc;
    }, {})
  );

  const handleChange = (id, value) => {
    setVisibility((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Visibility Settings:", visibility);
    // You can add API/localStorage save logic here
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center mb-6">
        <Heading text="Manage Visibility" />
      </div>

      <div className="space-y-4">
        {sectionList.map((section) => (
          <div
            key={section.id}
            className="flex justify-between items-center border p-4 rounded"
          >
            <span className="text-lg font-medium">{section.label}</span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={section.id}
                  checked={visibility[section.id] === true}
                  onChange={() => handleChange(section.id, true)}
                />
                Show
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={section.id}
                  checked={visibility[section.id] === false}
                  onChange={() => handleChange(section.id, false)}
                />
                Hide
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        {/* <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Save
        </button> */}

        <Button
          type="submit"
          variant="filled"
          className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </PageCont>
  );
};

export default Sections;
