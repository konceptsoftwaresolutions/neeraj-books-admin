import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useFieldArray, useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import {
  bestSellerOptions,
  bookSizeOptions,
  bookTypeOptions,
  colourOptions,
  discountOptions,
  mediumOptions,
  statusOptions,
} from "../../constant/options";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillEyeFill } from "react-icons/bs";
import Swal from "sweetalert2";
import {
  addBook,
  deleteBook,
  deleteEnglishAssignment,
  deleteEnglishEbook,
  deleteEnglishVideoPreview,
  deleteHindiAssignment,
  deleteHindiEbook,
  deleteMediumBook,
  deleteProductImage,
  deleteSamplePaperFilePDF,
  deleteSingleEbook,
  deletProductAssignment,
  downloadSingleEbook,
  getAssignmentFile,
  getAssignmentImage,
  getBrandName,
  getEbookNamesList,
  getEnglishAssignment,
  getEnglishEbook,
  getEnglishProdImagesLink,
  getEngProductImagesName,
  getHindiAssignment,
  getHindiEbook,
  getHindiProdImagesLink,
  getHindiProductImagesName,
  getSamplePaperCover,
  getSamplePaperData,
  getSamplePaperPdfFile,
  getSingleBook,
  updateBook,
} from "../../redux/features/books";
import ImageField from "../../common/fields/ImageField";
// import EditModal from "./EditModal";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTreeSelect from "../../components/CustomTreeSelect";
import { useEffect, useState } from "react";
import { FaFileImage, FaFilePdf, FaLink } from "react-icons/fa";
import {
  getCategories,
  getSubcategoryOptionsByIds,
} from "../../constant/utilityfunction";
import AIQuesPaperUpload from "./AIQuesPaperUpload";
import ImageFieldWithNumber from "../../common/fields/ImageFieldWithNumber";
import FileFieldWithText from "../../common/fields/FileFieldWithText";

const UpdateBook = () => {
  const { allCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.state, " location is this");
  // const { bookData, medium, outerId } = location.state || {};

  const [showDeleteBtn, setShowDeleteBtn] = useState(true);

  useEffect(() => {
    if (location.state.data.oldbookdata === true) {
      setShowDeleteBtn(false);
    }
  }, [location]);

  const { bookId: bookData, medium, outerId } = useParams();

  // console.log(bookData , medium , outerId)

  const parentCategoryOptions = allCategory?.map((category, index) => {
    return {
      label: category.name,
      value: category._id,
    };
  });

  useEffect(() => {
    dispatch(getBrandName());
  }, []);

  const [videoSrc, setVideoSrc] = useState("");
  const [isVideoValid, setIsVideoValid] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [assignmentUrl, setAssignmentUrl] = useState();
  const [productImages, setProductImages] = useState([]);
  const [productImageUrls, setProductImageUrls] = useState([]);
  const [ebookLink, setEbookLink] = useState();
  const [isEditable, setIsEditable] = useState(true);
  const [rowData, setRowData] = useState(null);
  const [samplePaperCoverUrl, setSamplePaperCoverUrl] = useState();

  const [ebookLoader, setEbookLoader] = useState(false);

  console.log(productImageUrls);

  const [solvedSamplePaperData, setSolvedSamplePaperData] = useState();

  const [assignmetnImageUrls, setAssignmentImageUrls] = useState({}); // Store image URLs
  const [solvedSamplePaperUrl, setSolvedSamplePaperUrl] = useState();
  const [assignmentPdfUrl, setAssignmentPdfUrl] = useState({});

  const { brandNames } = useSelector((state) => state.books);

  const brandNameOptions = brandNames?.map((item) => ({
    label: item,
    value: item,
  }));

  const fetchSingleBookData = (bookData, outerId) => {
    const payload = {
      localizedId: bookData,
      _id: outerId,
    };
    dispatch(
      getSingleBook(payload, (success, data) => {
        if (success) {
          console.log("fetched", data);
          setRowData(data);
        }
      })
    );
  };

  useEffect(() => {
    fetchSingleBookData(bookData, outerId);
  }, [bookData, outerId]);

  useEffect(() => {
    if (rowData?.title) {
      const title = rowData?.title;
      const videoUrl = `https://test.neerajbooks.com/api/neeraj/product/findProductVideoByTitle/${title}`;
      setVideoSrc(videoUrl); // Set the video URL dynamically
    }
  }, [rowData]);

  const getAssignmentLink = (mediumParams) => {
    if (mediumParams === "english" && rowData?.title) {
      const payload = {
        title: rowData?.title,
      };
      dispatch(
        getEnglishAssignment(payload, (url) => {
          if (url) {
            console.log("6666", url);

            setAssignmentUrl(url);
          }
        })
      );
    }
    if (mediumParams === "hindi" && rowData?.title) {
      const payload = {
        title: rowData?.title,
      };
      dispatch(
        getHindiAssignment(payload, (url) => {
          if (url) {
            console.log("6666", url);

            setAssignmentUrl(url);
          }
        })
      );
    }
  };

  useEffect(() => {
    if (medium === "English") {
      getAssignmentLink("english");
    }
    if (medium === "Hindi") {
      getAssignmentLink("hindi");
    }
  }, [rowData]);

  useEffect(() => {
    if (rowData?.title && medium === "English") {
      dispatch(
        getEngProductImagesName(rowData?.title, (array) => {
          console.log("fetched array", array);
          setProductImages(array); // Store the fetched array in the state
        })
      );
    }
    if (rowData?.title && medium === "Hindi") {
      console.log(rowData)
      dispatch(
        getHindiProductImagesName({title : rowData?.title , bookCode : rowData?.bookCode}, (array) => {
          console.log("fetched array hello", array);
          setProductImages(array); // Store the fetched array in the state
        })
      );
    }
  }, [rowData, dispatch]);

  useEffect(() => {
    if (productImages?.length > 0) {
      setProductImageUrls([]); // Clear previous URLs

      const fetchProductImages = async () => {
        const fetchedUrls = [];

        for (let i = 0; i < productImages.length; i++) {
          const name = productImages[i];
          const payload = {
            fileName: name,
            productId: outerId,
          };

          // Choose the appropriate action based on the medium
          const action =
            medium === "English"
              ? getEnglishProdImagesLink
              : getHindiProdImagesLink;

          const url = await new Promise((resolve) => {
            dispatch(action(payload, setImgLoading, (url) => resolve(url)));
          });

          if (url && !fetchedUrls.includes(url)) {
            fetchedUrls.push(url); // Avoid duplicates
          }
        }

        setProductImageUrls(fetchedUrls);
      };

      fetchProductImages();
    }
  }, [productImages, medium]);

  useEffect(() => {
    if (rowData?.title && medium === "English") {
      const payload = {
        localizedId: location?.state?.data?.outerId,
        language: "english",
      };
      dispatch(
        getEbookNamesList(payload, setEbookLoader, (success, data) => {
          if (success) {
            setEbookNamesList(data);
          } else {
            setEbookNamesList(null);
          }
        })
      );
    }
    if (rowData?.title && medium === "Hindi") {
      // dispatch(
      //   getHindiEbook(rowData.title, setEbookLoader, (url) => {
      //     if (url) {
      //       console.log("yyy", url);
      //       setEbookLink(url);
      //     } else {
      //       setEbookLink(url);
      //     }
      //   })
      // );
      const payload = {
        localizedId: location?.state?.data?.outerId,
        language: "hindi",
      };
      dispatch(
        getEbookNamesList(payload, setEbookLoader, (success, data) => {
          if (success) {
            setEbookNamesList(data);
          } else {
            setEbookNamesList(null);
          }
        })
      );
    }
  }, [rowData]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      medium: medium || "",
    },
  });

  useEffect(() => {
    if (rowData) {
      console.log(rowData);
      reset({
        // startPages: 10,
        // quesPaperPages: 100,
        // bookPages: 200,
        // totalPages: 310,
        // noOfForms: rowData?.noOfForms || 0,
        // editorRevisor: "hindiEditorRevisor",
        // bookType: "guide",
        // bookSize: "medium-regular",
        // bookColour: "singleColour",

        startPages: rowData?.startPages,
        quesPaperPages: rowData?.quesPaperPages,
        bookPages: rowData?.bookPages,
        extraPages: rowData?.extraPages,
        totalPages: rowData?.totalPages,
        noOfForms: rowData?.noOfForms,
        editorRevisor: rowData?.editorRevisor,
        bookType: rowData?.bookType,
        bookSize: rowData?.bookSize,
        bookColour: rowData?.bookColour,

        first: rowData?.first,
        revisedUpdated: rowData?.revisedUpdated,
        reprint: rowData?.reprint,

        youtubeQuestionPaperVideo: rowData?.youtubeQuestionPaperVideo,
        youtubeVideoPreview: rowData?.youtubeVideoPreview,
        totalNoOfPapers: rowData?.totalNoOfPapers,
        // totalPages: rowData?.totalPages,
        authorName: rowData?.authorName,
        viewParentCategory: rowData?.viewParentCategory,
        viewSubCategory: rowData?.viewSubCategory,
        viewSubSubCategory: rowData?.viewSubSubCategory,
        isDownloadableEngSolvedPaper:
          rowData?.solvedSamplePapers?.[0]?.isDownloadable || "",
        engSolvedPaperPrice: rowData?.solvedSamplePapers?.[0]?.price || "",
        solvedSamplePapers: rowData?.solvedSamplePapers?.samplePapers || "",
        isbn: rowData?.isbn || "",
        brand: rowData?.brand || "",
        eBookIsDownloadable: rowData?.eBookIsDownloadable || "",
        addEbookPrice: rowData?.addEbookPrice || "",
        order: rowData?.order || "",
        isBestSeller: rowData?.isBestSeller || "",
        course: rowData?.course || "",
        categories: rowData?.categories || "",
        title: rowData?.title || "",
        addDiscount: rowData?.addDiscount || "",
        // medium: rowData?.medium || "",
        description: rowData?.description || "",
        paperBackOriginalPrice: rowData?.paperBackOriginalPrice || "",
        paperBackDiscountedPrice: rowData?.paperBackDiscountedPrice || "",
        discountedPercentage: rowData?.discountedPercentage || "",
        eBookOriginalPrice: rowData?.eBookOriginalPrice || "",
        eBookDiscountedPrice: rowData?.eBookDiscountedPrice || "",
        addEbookPrice: rowData?.addEbookPrice || "",
        // descriptionPara: rowData?.descriptionPara || "",
        titleOfFirstSemesterSolvedPaper:
          rowData?.titleOfFirstSemesterSolvedPaper || "",
        linkOfFirstSemesterSolvedPaper:
          rowData?.linkOfFirstSemesterSolvedPaper || "",
        titleOfSecondSemesterSolvedPaper:
          rowData?.titleOfSecondSemesterSolvedPaper || "",
        linkOfSecondSemesterSolvedPaper:
          rowData?.linkOfSecondSemesterSolvedPaper || "",
        whatYouGetInBook: rowData?.whatYouGetInBook || "",
        commonLine: rowData?.commonLine || "",
        edition: rowData?.edition || "",
        bookCode: rowData?.bookCode || "",
        active: JSON.stringify(rowData?.active ?? ""),
        stock: rowData?.stock || "",
        weight: rowData?.weight || "",
        metaTitle: rowData?.metaTitle || "",
        metaTag: rowData?.metaTag || "",
        metaDescription: rowData?.metaDescription || "",

        theoreticalExplanationOfChapters:
          rowData?.theoreticalExplanationOfChapters || [
            { title: "", content: null },
          ],
        reviews: rowData?.reviews || [{ name: "", rating: "", comment: "" }],
        solvedAssignment: rowData?.assignments || [
          {
            session: "",
            isDownloadable: "",
            coverImg: "",
            assignmentFile: "",
            price: "",
            // medium: "",
            // course: "",
            // code: "",
            // title: "",
          },
        ],
        solvedSamplePapers: rowData?.samplePapers || [
          {
            file: "",
          },
        ],
      });
    }
  }, [rowData, reset]);

  const startPages = watch("startPages");
  const quesPaperPages = watch("quesPaperPages");
  const bookPages = watch("bookPages");
  const extraPages = watch("extraPages");
  const totalPages = watch("totalPages");
  const bookSize = watch("bookSize");

  useEffect(() => {
    const s = parseInt(startPages) || 0;
    const q = parseInt(quesPaperPages) || 0;
    const b = parseInt(bookPages) || 0;
    const e = parseInt(extraPages) || 0;

    setValue("totalPages", s + q + b + e);
  }, [startPages, quesPaperPages, bookPages, extraPages, setValue]);

  useEffect(() => {
    if (bookSize && totalPages) {
      let noOfForms;
      if (bookSize === "medium-regular") {
        noOfForms = totalPages / 8;
      } else if (bookSize === "large-slim") {
        noOfForms = totalPages / 8;
      } else if (bookSize === "small-hos") {
        noOfForms = totalPages / 16;
      } else {
        noOfForms = totalPages / 16;
      }
      setValue("noOfForms", Math.floor(noOfForms));
    }
  }, [bookSize, totalPages]);

  // Reset form values when rowData is available
  // useEffect(() => {
  //   if (solvedSamplePaperData) {
  //     reset({
  //       isDownloadableEngSolvedPaper:
  //         solvedSamplePaperData?.isDownloadable || "",
  //       engSolvedPaperPrice: solvedSamplePaperData?.price || "",
  //     });
  //   }
  // }, [solvedSamplePaperData, reset]);

  const [subCategoryOptions, setSubCategoryOptions] = useState();
  const [subSubCategoryOptions, setSubSubCategoryOptions] = useState();
  const [ebookNamesList, setEbookNamesList] = useState([]);

  const selectedParentCategory = watch("viewParentCategory");
  const selectedSubCategory = watch("viewSubCategory");

  useEffect(() => {
    if (selectedParentCategory) {
      const result = getSubcategoryOptionsByIds(
        allCategory,
        selectedParentCategory
      );
      setSubCategoryOptions(result);
    }
  }, [selectedParentCategory]);

  useEffect(() => {
    if (selectedSubCategory) {
      const result = getSubcategoryOptionsByIds(
        allCategory,
        selectedSubCategory
      );
      console.log(result);
      setSubSubCategoryOptions(result);
    }
  }, [selectedSubCategory]);

  useEffect(() => {
    const payload = {
      productId: outerId,
      language: medium,
    };
    dispatch(
      getSamplePaperCover(payload, (success, coverUrl) => {
        if (success) {
          setSamplePaperCoverUrl(coverUrl);
        }
      })
    );
  }, [medium, outerId, rowData]);

  const {
    fields: chapterFields,
    append: appendChapter,
    remove: removeChapter,
  } = useFieldArray({
    control,
    name: "theoreticalExplanationOfChapters", // The field array name for chapters
  });

  const {
    fields: samplePaperFields,
    append: appendSamplePaper,
    remove: removeSamplePaper,
  } = useFieldArray({
    control,
    name: "solvedSamplePapers", // The field array name for chapters
  });

  const {
    fields: solvedAssignmentFields,
    append: appendSolvedAssignment,
    remove: removeSolvedAssignment,
  } = useFieldArray({
    control,
    name: "solvedAssignment", // The field array name for chapters
  });

  const {
    fields: hindiChapterFields,
    append: appendHindiChapter,
    remove: removeHindiChapter,
  } = useFieldArray({
    control,
    name: "theoreticalExplanationOfHindiChapters", // The field array name for chapters
  });

  // const {
  //   fields: questions,
  //   append: addQuestion,
  //   remove: removeQuestion,
  // } = useFieldArray({
  //   control,
  //   name: "quiz",
  // });

  const {
    fields: reviewsFields,
    append: appendReview,
    remove: removeReview,
  } = useFieldArray({
    control,
    name: "reviews",
  });

  const selectedDiscountedPercentage = watch("discountedPercentage");
  const selectedMedium = watch("medium");
  const discountSelected = watch("addDiscount");

  function convertToFormData(obj, formData = new FormData(), parentKey = "") {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;
        console.log(obj);

        // Skip 'fileName' key
        if (key === "fileName") {
          continue;
        }

        // Check if value is a blobURL (string and starts with 'blob:')
        if (value && typeof value === "string" && value.startsWith("blob:")) {
          // Skip appending blobURL
          continue;
        }

        if (
          value &&
          typeof value === "object" &&
          !Array.isArray(value) &&
          !(value instanceof File) &&
          !(value instanceof Blob) && // Skip Blobs
          !(value instanceof URL) // Skip URLs
        ) {
          // Recursively call for nested objects
          convertToFormData(value, formData, formKey);
        } else if (Array.isArray(value)) {
          // Handle arrays
          value.forEach((item, index) => {
            const arrayKey = `${formKey}[${index}]`;
            if (
              typeof item === "object" &&
              !(item instanceof File) &&
              !(item instanceof Blob) && // Skip Blobs in array
              !(item instanceof URL) // Skip URLs in array
            ) {
              convertToFormData(item, formData, arrayKey);
            } else {
              formData.append(arrayKey, item);
            }
          });
        } else {
          // Handle primitive values and File objects
          formData.append(formKey, value != null ? value : "");
        }
      }
    }
    return formData;
  }

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);

    // Initialize payload

    const slug = data.title.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase & replace spaces with "-"

    const bookData = {
      first: data?.first,
      revisedUpdated: data?.revisedUpdated,
      reprint: data?.reprint,
      startPages: data?.startPages,
      quesPaperPages: data?.quesPaperPages,
      bookPages: data?.bookPages,
      extraPages: data?.extraPages,
      totalPages: data?.totalPages,
      noOfForms: data?.noOfForms,
      editorRevisor: data?.editorRevisor,
      bookType: data?.bookType,
      bookSize: data?.bookSize,
      bookColour: data?.bookColour,

      youtubeQuestionPaperVideo: data?.youtubeQuestionPaperVideo,
      youtubeVideoPreview: data?.youtubeVideoPreview,
      totalNoOfPapers: data?.totalNoOfPapers,
      totalPages: data?.totalPages,
      authorName: data?.authorName,
      metaTitle: data?.metaTitle,
      metaDescription: data?.metaDescription,
      metaTag: data?.metaTag,
      viewParentCategory: data?.viewParentCategory,
      viewSubCategory: data?.viewSubCategory,
      viewSubSubCategory: data?.viewSubSubCategory,
      categories: getCategories(data),
      eBookIsDownloadable: data?.eBookIsDownloadable,
      isDownloadableEngSolvedPaper: data?.isDownloadableEngSolvedPaper,
      engSolvedPaperImg: data?.engSolvedPaperImg,
      engSolvedPaperPrice: data?.engSolvedPaperPrice,
      solvedAssignment: data?.solvedAssignment,
      solvedSamplePapers: data?.solvedSamplePapers,
      addEbookPrice: data?.addEbookPrice,
      order: data?.order,
      isbn: data?.isbn,
      brand: data?.brand,
      active: data?.active === "true",
      addDiscount: data?.addDiscount,
      paperBackOriginalPrice: data?.paperBackOriginalPrice,
      paperBackDiscountedPrice:
        data?.addDiscount === "yes"
          ? (
              parseFloat(data?.paperBackOriginalPrice) -
              (parseFloat(data?.paperDiscount) / 100) *
                parseFloat(data?.paperBackOriginalPrice)
            ).toString()
          : data?.paperBackDiscountedPrice, // Keep as string
      eBookOriginalPrice: data?.eBookOriginalPrice,
      eBookDiscountedPrice: data?.eBookDiscountedPrice,
      title: data?.title,
      description: data?.description,
      bookCode: data?.bookCode,
      edition: data?.edition,
      commonLine: data?.commonLine,
      // descriptionPara: data?.descriptionPara,
      whatYouGetInBook: data?.whatYouGetInBook,
      stock: data?.stock,
      isBestSeller: data?.isBestSeller,
      [selectedMedium === "English" ? "englishAssignment" : "hindiAssignment"]:
        data?.assignment,
      [selectedMedium === "English" ? "videoPreview" : "hindiVideoPreview"]:
        data?.videoPreview,
      [selectedMedium === "English" ? "ebook" : "ebook"]: data?.ebook,
      [selectedMedium === "English" ? "image" : "hindiImage"]: data?.image,
      singleImage: data?.singleImage,
      linkOfFirstSemesterSolvedPaper: data?.linkOfFirstSemesterSolvedPaper,
      titleOfFirstSemesterSolvedPaper: data?.titleOfFirstSemesterSolvedPaper,
      titleOfSecondSemesterSolvedPaper: data?.titleOfSecondSemesterSolvedPaper,
      linkOfSecondSemesterSolvedPaper: data?.linkOfSecondSemesterSolvedPaper,
      theoreticalExplanationOfChapters: data?.theoreticalExplanationOfChapters,
      medium: selectedMedium === "English" ? "english" : "hindi",
      slug: slug,
      course: data?.course,
      weight: data?.weight,
      reviews: data?.reviews,
    };

    const payload = {
      [selectedMedium?.toLowerCase()]: bookData,
      _id: outerId,
    };

    const formData = convertToFormData(payload);
    // To verify the result
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    dispatch(
      updateBook({ formData: formData }, (success, data) => {
        if (success) {
          setIsLoading(false);
          fetchSingleBookData(
            location?.state?.data?.bookId,
            location?.state?.data?.outerId
          );
        } else {
          setIsLoading(false);
        }
      })
    );
  };

  const downloadOptions = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  const handleVideoDelete = () => {
    const payload = {
      productId: outerId,
    };
    if (medium === "English") {
      dispatch(deleteEnglishVideoPreview(payload));
    }
    if (medium === "Hindi") {
      dispatch(deleteEnglishVideoPreview(payload));
    }
  };

  // const handleEbookDelete = () => {
  //   const payload = {
  //     productId: outerId,
  //   };
  //   if (medium === "English") {
  //     dispatch(
  //       deleteEnglishEbook(payload, (success) => {
  //         if (success) {
  //           setEbookLink(null);
  //         }
  //       })
  //     );
  //   }
  //   if (medium === "Hindi") {
  //     dispatch(
  //       deleteHindiEbook(payload, (success) => {
  //         if (success) {
  //           setEbookLink(null);
  //         }
  //       })
  //     );
  //   }
  // };

  const handleAssignmentDelete = () => {
    const payload = {
      productId: outerId,
    };
    if (medium === "English") {
      dispatch(deleteEnglishAssignment(payload));
    }
    if (medium === "Hindi") {
      dispatch(deleteHindiAssignment(payload));
    }
  };

  const handleBookImgDelete = (index) => {
    const imgName = productImages[index];
    console.log(imgName);
    const payload = {
      language: medium === "English" ? "english" : "hindi",
      productId: outerId,
      fileName: imgName,
    };
    console.log(payload);
    dispatch(
      deleteProductImage(payload, (success) => {
        if (success) {
          window.location.reload();
        }
      })
    );
  };

  const handleWholeBookDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch delete action only if confirmed
        const payload = { _id: outerId };
        dispatch(deleteBook(payload));
        // .then(() => {
        //   Swal.fire("Deleted!", "The book has been deleted.", "success");
        // })
        // .catch(() => {
        //   Swal.fire("Error!", "Failed to delete the book.", "error");
        // });
      }
    });
  };

  const handleMediumDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          productId: outerId,
          localizedId: rowData?._id,
        };

        dispatch(deleteMediumBook(payload));
        // .then(() => {
        //   Swal.fire("Deleted!", "The medium has been removed.", "success");
        // })
        // .catch(() => {
        //   Swal.fire("Error!", "Failed to delete the medium.", "error");
        // });
      }
    });
  };

  const handleAssignmentProductDelete = (index) => {
    const payload = {
      index: index,
      productId: outerId,
      language: medium.toLowerCase(),
    };
    console.log(payload);
    dispatch(deletProductAssignment(payload));
  };

  useEffect(() => {
    solvedAssignmentFields?.forEach((item, index) => {
      const payload = {
        index: index,
        productId: outerId,
        language: medium.toLowerCase(),
      };

      dispatch(
        getAssignmentImage(payload, (success, url) => {
          if (success) {
            setAssignmentImageUrls((prev) => ({ ...prev, [index]: url }));
          }
        })
      );
      dispatch(
        getAssignmentFile(payload, (success, url) => {
          if (success) {
            setAssignmentPdfUrl((prev) => ({ ...prev, [index]: url }));
          }
        })
      );
    });
  }, [solvedAssignmentFields]); // Runs when `solvedAssignmentFields` changes

  useEffect(() => {
    if (rowData?.solvedSamplePapers) {
      dispatch(
        getSamplePaperData(rowData?.solvedSamplePapers[0], (success, data) => {
          if (success) {
            setSolvedSamplePaperData(data);
          }
        })
      );
    }
  }, [rowData]);

  const [solvedPaperFilePdfUrl, setSolvedPaperFilePdfUrl] = useState();

  const [pdfUrls, setPdfUrls] = useState({});

  // Fetch sample paper URLs only when samplePaperFields is available
  useEffect(() => {
    if (rowData) {
      console.log("dddddd", rowData?.solvedSamplePapers?.[0]?.samplePapers);
      const fetchPdfUrls = async () => {
        const newPdfUrls = {};
        for (const [
          index,
          item,
        ] of rowData?.solvedSamplePapers[0]?.samplePapers?.entries()) {
          const payload = {
            productId: outerId,
            language: medium === "English" ? "english" : "hindi",
            index: index,
          };
          const pdfUrl = await dispatch(getSamplePaperPdfFile(payload));
          newPdfUrls[index] = pdfUrl;
        }
        setPdfUrls(newPdfUrls);
      };

      fetchPdfUrls();
    }
  }, [rowData, dispatch, medium, outerId]);

  const deleteSolvedPaperFile = (index) => {
    const payload = {
      solvedPaperId: rowData?.solvedSamplePapers[0].localizedId,
      index: index,
    };
    dispatch(deleteSamplePaperFilePDF(payload));
  };

  const handleEbookClick = (item) => {
    const payload = {
      localizedId: location?.state?.data?.outerId,
      language: medium,
      name: item,
    };
    console.log(payload);
    dispatch(downloadSingleEbook(payload));
  };

  const handleEbookDelete = (item) => {
    const payload = {
      localizedId: location?.state?.data?.outerId,
      language: medium,
      name: item,
    };

    dispatch(deleteSingleEbook(payload));
  };

  return (
    <PageCont>
      <div className="flex justify-between">
        <Heading text="Book Details" />
        {showDeleteBtn && (
          <Button
            type="button"
            className="primary-gradient mt-4 mb-4 capitalize"
            onClick={handleWholeBookDelete}
          >
            Delete English + Hindi Book
          </Button>
        )}
      </div>
      {rowData ? (
        <>
          <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-4 gap-3">
                <InputField
                  control={control}
                  errors={errors}
                  name="medium"
                  label="Select Medium"
                  type="select"
                  options={mediumOptions}
                  defaultValue="English"
                  disabled={!isEditable}
                />

                {/* <InputField
          control={control}
          errors={errors}
          name="discountedPercentage"
          label="Discounted percentage"
          type="option"
          options={discountedPercentageOptions}
        /> */}

                {/* Conditional rendering based on the selected value */}
                {selectedDiscountedPercentage === "yes" && (
                  <>
                    {" "}
                    <InputField
                      control={control}
                      errors={errors}
                      name="paperBackDiscountedPercent"
                      label="Paperback Discount Off"
                      type="number"
                      disabled={!isEditable}
                    />{" "}
                  </>
                )}

                {selectedDiscountedPercentage === "no" && <></>}

                {/* <InputField
              control={control}
              errors={errors}
              name="course"
              label="Course"
              type="text"
              disabled={!isEditable}
            /> */}
              </div>

              <div className=" rounded-lg bg-gray-100  p-4 mt-6">
                {/* <p className="border-b-2 border-gray-200 pb-2 mb-2 font-semibold">
                EngBook Fields
              </p> */}
                <div className="w-full grid  gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 ">
                  <InputField
                    control={control}
                    errors={errors}
                    label="Parent Category"
                    name="viewParentCategory"
                    type="option"
                    mode="single"
                    options={parentCategoryOptions}
                  />

                  <InputField
                    control={control}
                    errors={errors}
                    label="Sub Category"
                    name="viewSubCategory"
                    type="select"
                    options={subCategoryOptions}
                  />

                  <InputField
                    control={control}
                    errors={errors}
                    label="Sub-Sub Category"
                    name="viewSubSubCategory"
                    type="select"
                    options={subSubCategoryOptions}
                  />

                  <div>
                    <CustomTreeSelect
                      data={allCategory}
                      control={control}
                      name="categories"
                      disabled={true}
                    />
                  </div>
                  <InputField
                    control={control}
                    errors={errors}
                    name="title"
                    label="Title"
                    disabled={!isEditable}
                  />

                  <InputField
                    control={control}
                    errors={errors}
                    name="bookCode"
                    label="Book Code"
                    type="text"
                    subLabel="if you see $$ please dont change it!!"
                    disabled={!isEditable}
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="paperBackOriginalPrice"
                    label="Paperback Original Price"
                    type="number"
                    disabled={!isEditable}
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="addDiscount"
                    label="Discount"
                    type="option"
                    options={discountOptions}
                    defaultValue="yes"
                  />

                  {discountSelected === "yes" ? (
                    <InputField
                      control={control}
                      errors={errors}
                      name="paperDiscount"
                      label="Enter Discount %"
                      type="number"
                    />
                  ) : (
                    <InputField
                      control={control}
                      errors={errors}
                      name="paperBackDiscountedPrice"
                      label="Paperback Discounted Price"
                      type="numeric"
                    />
                  )}

                  <InputField
                    control={control}
                    errors={errors}
                    name="eBookOriginalPrice"
                    label="E-Book Original Price"
                    type="number"
                    disabled={!isEditable}
                  />

                  <InputField
                    control={control}
                    errors={errors}
                    name="eBookDiscountedPrice"
                    label="E-Book Discounted Price"
                    type="number"
                    disabled={!isEditable}
                  />

                  <InputField
                    control={control}
                    errors={errors}
                    name="addEbookPrice"
                    label="E-book Addition Price"
                    type="number"
                    // required={true}
                  />

                  <InputField
                    control={control}
                    errors={errors}
                    name="active"
                    label="Active"
                    type="option"
                    options={statusOptions}
                  />

                  {/* <InputField
                control={control}
                errors={errors}
                name="paperBackDiscountedPrice"
                label="Paperback Discounted Price"
                type="numeric"
                disabled={!isEditable}
              /> */}

                  {/* <InputField
                control={control}
                errors={errors}
                name="order"
                label="Order"
                type="numeric"
              /> */}

                  <InputField
                    control={control}
                    errors={errors}
                    name="weight"
                    label="Weight (kg)"
                    disabled={!isEditable}
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="isbn"
                    label="ISBN"
                    type="text"
                  />

                  <InputField
                    control={control}
                    errors={errors}
                    name="brand"
                    label="Brand"
                    type="option"
                    options={brandNameOptions}
                    // required={true}
                  />

                  {/* <InputField
                control={control}
                errors={errors}
                name="description"
                label="Sub Info"
                type="text"
                disabled={!isEditable}
              /> */}

                  <InputField
                    control={control}
                    errors={errors}
                    name="edition"
                    label="For Session"
                    type="text"
                    disabled={!isEditable}
                  />

                  <InputField
                    control={control}
                    errors={errors}
                    name="commonLine"
                    label="Common Line"
                    type="description"
                    disabled={!isEditable}
                  />
                  {/* <p>{videoSrc}</p> */}
                  {/* <div className="relative"> */}
                  {/* <a
                  href={videoSrc}
                  target="_blank"
                  className="absolute right-0 top-1"
                >
                  <FaLink />
                </a> */}

                  {/* {!videoSrc && !isEditable && (
                      <div>
                        <p className="font-medium ml-0.5 text-[#000000]">
                          Video Preview
                        </p>
                        <div className="flex mt-2 items-center border w-full border-solid border-[#6E6E6E] overflow-hidden bg-transparent rounded-sm">
                          <a className="w-full min-h[40px] text-[#000000] px-2.5 py-2 text-sm font-poppins placeholder:font-poppins placeholder:not-italic placeholder:text-sm placeholder:leading-normal placeholder:font-medium placeholder:text-[#6E6E6E] not-italic leading-normal bg-transparent font-medium outline-none border-none disabled:bg-[#eceff1] disabled:cursor-not-allowed">
                            Not Added
                          </a>
                        </div>
                      </div>
                    )}
                    {videoSrc && (
                      <div className="flex justify-end absolute right-0 gap-3">
                        <Tooltip title="View Video">
                          <a target="_blank" href={videoSrc} className="">
                            <BsFillEyeFill size={20} />
                          </a>
                        </Tooltip>
                        {showDeleteBtn && (
                          <div onClick={handleVideoDelete} className="w-max">
                            <Tooltip title="Delete Video">
                              <MdDelete size={20} className="" />
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    )}
                    {isEditable && (
                      <InputField
                        control={control}
                        errors={errors}
                        name="videoPreview"
                        label="Video Preview "
                        type="file"
                        disabled={!isEditable}
                      />
                    )} */}
                  {/* </div> */}
                  <div className="relative">
                    {rowData?.youtubeVideoPreview && (
                      <div className="absolute right-0">
                        <Tooltip title="View Video">
                          <a
                            target="_blank"
                            href={rowData?.youtubeVideoPreview}
                            className=""
                          >
                            <BsFillEyeFill size={20} />
                          </a>
                        </Tooltip>
                      </div>
                    )}
                    <InputField
                      control={control}
                      errors={errors}
                      name="youtubeVideoPreview"
                      label="YT Video Preview "
                      type="text"
                    />
                  </div>
                  <div className="relative">
                    {rowData?.youtubeQuestionPaperVideo && (
                      <div className="absolute right-0">
                        <Tooltip title="View Video">
                          <a
                            target="_blank"
                            href={rowData?.youtubeQuestionPaperVideo}
                            className=""
                          >
                            <BsFillEyeFill size={20} />
                          </a>
                        </Tooltip>
                      </div>
                    )}
                    <InputField
                      control={control}
                      errors={errors}
                      name="youtubeQuestionPaperVideo"
                      label="YT Ques. Paper Video "
                      type="text"
                    />
                  </div>

                  {/* <InputField
                    control={control}
                    errors={errors}
                    name="descriptionPara"
                    label="Book Description"
                    type="description"
                    disabled={!isEditable}
                  /> */}

                  {/* <InputField
                control={control}
                errors={errors}
                name="whatYouGetInBook"
                label="What book includes"
                type="description"
                disabled={!isEditable}
              /> */}

                  <InputField
                    control={control}
                    errors={errors}
                    name="stock"
                    label="Stock"
                    type="number"
                    disabled={!isEditable}
                  />

                  <InputField
                    control={control}
                    errors={errors}
                    name="isBestSeller"
                    label="Best Seller"
                    options={bestSellerOptions}
                    type="select"
                    mode="single"
                    disabled={!isEditable}
                  />

                  <InputField
                    control={control}
                    errors={errors}
                    name="bookType"
                    label="Book Type"
                    options={bookTypeOptions}
                    type="select"
                    mode="single"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="bookSize"
                    label="Book Size"
                    options={bookSizeOptions}
                    type="select"
                    mode="single"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="bookColour"
                    label="Book Colour"
                    options={colourOptions}
                    type="select"
                    mode="single"
                  />
                  {/* <div className="relative">
                {assignmentUrl && (
                  <Tooltip title="View Assignment">
                    <a
                      target="_blank"
                      href={assignmentUrl}
                      className="absolute right-[28px] top-[1px]"
                    >
                      <BsFillEyeFill size={20} />
                    </a>
                  </Tooltip>
                )}
                {!assignmentUrl && !isEditable && (
                  <div>
                    <p className="font-medium ml-0.5 text-[#000000]">
                      Assignment
                    </p>
                    <div className="flex mt-2 items-center border w-full border-solid border-[#6E6E6E] overflow-hidden bg-transparent rounded-sm">
                      <a className="w-full min-h[40px] text-[#000000] px-2.5 py-2 text-sm font-poppins placeholder:font-poppins placeholder:not-italic placeholder:text-sm placeholder:leading-normal placeholder:font-medium placeholder:text-[#6E6E6E] not-italic leading-normal bg-transparent font-medium outline-none border-none disabled:bg-[#eceff1] disabled:cursor-not-allowed">
                        Not Added
                      </a>
                    </div>
                  </div>
                )}
                {isEditable && assignmentUrl && (
                  <div onClick={handleAssignmentDelete}>
                    <Tooltip title="Delete Assignment">
                      <MdDelete
                        size={20}
                        className="cursor-pointer absolute top-0 right-0"
                      />
                    </Tooltip>
                  </div>
                )}
                {isEditable && (
                  <InputField
                    control={control}
                    errors={errors}
                    name="assignment"
                    label="Assignment "
                    type="file"
                    disabled={!isEditable}
                  />
                )}
              </div> */}
                </div>
                <div>
                  <div>
                    <div className="grid grid-cols-5 gap-3 mt-2">
                      {productImageUrls?.length < 0 && <p>No Image Added...</p>}
                      {imgLoading ? (
                        <div className="text-center">Loading...</div> // Show loading state
                      ) : (
                        productImageUrls?.map((url, index) => (
                          <div key={index} className="relative">
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src={url} alt="Product" />
                            </a>
                            {showDeleteBtn && (
                              <Tooltip title="Delete Image">
                                <MdDelete
                                  size={25}
                                  onClick={() => handleBookImgDelete(index)}
                                  className="absolute top-1 right-1 text-white cursor-pointer py-1 bg-red-500 hover:shadow-lg rounded-md border-blue-gray-500"
                                />
                              </Tooltip>
                            )}
                          </div>
                        ))
                      )}
                    </div>

                    <ImageField
                      control={control}
                      errors={errors}
                      name={"image"}
                      maxFiles={10}
                      label="Book Images (530px X 700px)"
                      disabled={!isEditable}
                    />
                    <ImageFieldWithNumber
                      control={control}
                      errors={errors}
                      name={"singleImage"}
                      maxFiles={10}
                      label="Image with order (530px X 700px)"
                      disabled={!isEditable}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 pt-2 relative">
                  {!ebookLink && !isEditable && (
                    <div>
                      <p className="font-medium ml-0.5 text-[#000000]">Ebook</p>
                      <div className="flex mt-2 items-center border w-full border-solid border-[#6E6E6E] overflow-hidden bg-transparent rounded-sm">
                        <a className="w-full min-h[40px] text-[#000000] px-2.5 py-2 text-sm font-poppins placeholder:font-poppins placeholder:not-italic placeholder:text-sm placeholder:leading-normal placeholder:font-medium placeholder:text-[#6E6E6E] not-italic leading-normal bg-transparent font-medium outline-none border-none disabled:bg-[#eceff1] disabled:cursor-not-allowed">
                          Not Added
                        </a>
                      </div>
                    </div>
                  )}

                  {isEditable && (
                    // <InputField
                    //   control={control}
                    //   errors={errors}
                    //   name="ebook"
                    //   label="Add E-Books"
                    //   disabled={!isEditable}
                    //   type="uploadFiles"
                    // />

                    <FileFieldWithText
                      control={control}
                      errors={errors}
                      name={"ebook"}
                      maxFiles={20}
                      label="Add E-Books"
                      disabled={!isEditable}
                    />
                  )}
                </div>
                <div className="  flex justify-start gap-2">
                  {ebookLoader ? (
                    <p className="text-center w-full">Loading...</p>
                  ) : ebookNamesList.length > 0 ? (
                    <>
                      <div className="flex gap-6 flex-wrap">
                        {ebookNamesList?.map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow hover:shadow-md transition-all duration-200 w-28 relative"
                          >
                            <Tooltip title="View E-book">
                              <div
                                onClick={() => handleEbookClick(item)}
                                className="flex flex-col items-center cursor-pointer"
                              >
                                <FaFilePdf
                                  size={28}
                                  className="text-red-600 mb-1"
                                />
                                <p className="text-blue-700 text-sm text-center break-words">
                                  {item || "Ebook"}
                                </p>
                              </div>
                            </Tooltip>

                            {showDeleteBtn && (
                              <Tooltip title="Delete E-book">
                                <p
                                  onClick={() => handleEbookDelete(item)}
                                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition-colors"
                                >
                                  <MdDelete size={18} />
                                </p>
                              </Tooltip>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-center w-full">No ebook added</p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <InputField
                    control={control}
                    errors={errors}
                    name="eBookIsDownloadable"
                    label="Is Ebook Downloadable"
                    type="option"
                    options={discountOptions}
                    // required={true}
                  />
                  {/* <InputField
                    control={control}
                    errors={errors}
                    name="totalPages"
                    label="Total Pages"
                    type="number"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="totalNoOfPapers"
                    label="Total No. Of Papers"
                    type="number"
                  /> */}
                  {/* <InputField
                    control={control}
                    errors={errors}
                    name="authorName"
                    label="Author Name"
                    type="text"
                  /> */}
                </div>
                <div className="w-full grid  gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 mt-5">
                  <InputField
                    control={control}
                    errors={errors}
                    name="startPages"
                    label="Start Pages"
                    type="numeric"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="quesPaperPages"
                    label="Ques Papers"
                    type="numeric"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="bookPages"
                    label="Book Pages"
                    type="numeric"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="extraPages"
                    label="Extra Pages"
                    type="numeric"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="totalPages"
                    label="Total Pages"
                    type="number"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="noOfForms"
                    label="No. Of Forms"
                    type="numeric"
                    disabled="true"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="authorName"
                    label="Author"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="editorRevisor"
                    label="Editor/Revisor"
                    type="text"
                  />
                </div>
                <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md mt-8">
                  <p className="font-semibold">About The Book</p>
                  <Tooltip title="Add More Content" placement="left">
                    <Button
                      variant="gradient"
                      color="blue"
                      className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                      onClick={
                        () =>
                          appendChapter({
                            title: "",
                            content: null,
                          }) // Append new field
                      }
                    >
                      <IoIosAddCircle size={17} />
                    </Button>
                  </Tooltip>
                </div>

                <div>
                  {chapterFields?.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-[#f5f7fb] rounded-lg mt-2 pb-2"
                    >
                      <div className="grid grid-cols-1 gap-3 p-3 relative ">
                        {/* Title Input */}
                        <InputField
                          control={control}
                          errors={errors}
                          name={`theoreticalExplanationOfChapters.${index}.title`}
                          label={`Title ${index + 1}`}
                          type="text"
                          disabled={!isEditable}
                        />

                        {/* File Input */}
                        <InputField
                          control={control}
                          errors={errors}
                          name={`theoreticalExplanationOfChapters.${index}.content`}
                          label="Description"
                          type="textEditor"
                          disabled={!isEditable}
                        />
                      </div>
                      {/* Remove Button */}
                      {showDeleteBtn && (
                        <div className="flex justify-end pr-3">
                          <Button
                            size="sm"
                            variant="outlined"
                            color="white"
                            className="bg-red-500 w-max p-2 ml-2 "
                            onClick={() => removeChapter(index)} // Remove field
                          >
                            <MdDelete size={17} />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
                  <p className="font-semibold py-2">Edition</p>
                </div>
                <div className="grid grid-col-2 md:grid-cols-3 gap-3 bg-[#f5f7fb] rounded-lg mt-2 p-3 mb-3">
                  <InputField
                    control={control}
                    errors={errors}
                    name="first"
                    label="First"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="revisedUpdated"
                    label="Revised/Updated"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="reprint"
                    label="Reprint"
                  />
                </div>

                <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
                  <p className="font-semibold py-2">Solved Papers </p>
                  <Tooltip title="Add More ">
                    <Button
                      variant="gradient"
                      color="blue"
                      className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                      onClick={
                        () =>
                          appendSamplePaper({
                            file: "",
                          }) // Append new field
                      }
                    >
                      <IoIosAddCircle size={17} />
                    </Button>
                  </Tooltip>
                </div>
                <div className="grid p-3">
                  <div className="grid grid-cols-3 gap-3">
                    <InputField
                      control={control}
                      errors={errors}
                      name="isDownloadableEngSolvedPaper"
                      label="Downloadable"
                      type="option"
                      options={[
                        { label: "Yes", value: "true" },
                        { label: "No", value: "false" },
                      ]}
                    />

                    <div className="relative">
                      <InputField
                        control={control}
                        errors={errors}
                        name="engSolvedPaperImg"
                        label="Image"
                        type="file"
                      />
                      {samplePaperCoverUrl && (
                        <Tooltip title="View Image">
                          <FaFileImage
                            onClick={() => {
                              window.open(samplePaperCoverUrl, "_blank");
                            }}
                            size={20}
                            className="cursor-pointer text-green-300 absolute top-0 right-0"
                          />
                        </Tooltip>
                      )}
                    </div>
                    <InputField
                      control={control}
                      errors={errors}
                      name="engSolvedPaperPrice"
                      label="Price"
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {samplePaperFields?.map((item, index) => {
                      const payload = {
                        productId: outerId,
                        language: medium === "English" ? "english" : "hindi",
                        index: index,
                      };

                      return (
                        <div
                          key={item.id}
                          className="bg-[#f5f7fb] rounded-lg mt-2 pb-2"
                        >
                          <div className="grid grid-cols-1  p-3 relative ">
                            {pdfUrls[index] && (
                              <Tooltip title="View Pdf">
                                <FaFilePdf
                                  onClick={() => {
                                    const url = pdfUrls[index];
                                    if (url) {
                                      window.open(url, "_blank");
                                    }
                                  }}
                                  size={20}
                                  className="cursor-pointer text-green-300 absolute top-3 right-2"
                                />
                              </Tooltip>
                            )}

                            <InputField
                              control={control}
                              errors={errors}
                              name={`solvedSamplePapers.${index}.file`}
                              label={`Solved Sample Paper`}
                              type="file"
                            />
                          </div>
                          {/* Remove Button */}
                          {showDeleteBtn && (
                            <div className="flex justify-end pr-3">
                              <Button
                                size="sm"
                                variant="outlined"
                                color="white"
                                className="bg-red-500 w-max p-2 ml-2 "
                                onClick={() => {
                                  removeSamplePaper(index);
                                  deleteSolvedPaperFile(index);
                                }} // Remove field
                              >
                                <MdDelete size={17} />
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
                  <p className="font-semibold py-2">Solved Assignments</p>
                  <Tooltip title="Add More Content" placement="left">
                    <Button
                      variant="gradient"
                      color="blue"
                      className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                      onClick={
                        () =>
                          appendSolvedAssignment({
                            session: "",
                            isDownloadable: "",
                            coverImg: "",
                            assignmentFile: "",
                            price: "",
                            // medium: "",
                            // course: "",
                            // code: "",
                            // title: "",
                          }) // Append new field
                      }
                    >
                      <IoIosAddCircle size={17} />
                    </Button>
                  </Tooltip>
                </div>
                <div>
                  {solvedAssignmentFields?.map((item, index) => {
                    // const payload = {
                    //   index: index,
                    //   productId: outerId,
                    //   language: medium.toLowerCase(),
                    // };
                    // const imgUrl = dispatch(
                    //   getAssignmentImage(payload, (success, url) => {
                    //     if (success) {
                    //       return url;
                    //     }
                    //   })
                    // );
                    return (
                      <div
                        key={item.id}
                        className="bg-[#f5f7fb] rounded-lg mt-2 pb-2"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3 relative ">
                          {/* Title Input */}
                          <InputField
                            control={control}
                            errors={errors}
                            name={`solvedAssignment.${index}.session`}
                            label={`Session`}
                            defaultValue={item?.session} // Pass the default session range
                            type="monthRange"
                          />
                          <InputField
                            control={control}
                            errors={errors}
                            name={`solvedAssignment.${index}.isDownloadable`}
                            label={`Downloadable`}
                            defaultValue={
                              item?.isDownloadable ? "true" : "false"
                            }
                            type="option"
                            options={downloadOptions}
                          />

                          <div className="relative">
                            <InputField
                              control={control}
                              errors={errors}
                              name={`solvedAssignment.${index}.coverImg`}
                              label={`Image`}
                              type="file"
                            />

                            {assignmetnImageUrls[index] && (
                              <div className="absolute top-0 right-0">
                                <Tooltip title="View Image">
                                  <FaFileImage
                                    onClick={() => {
                                      window.open(
                                        assignmetnImageUrls[index],
                                        "_blank"
                                      );
                                    }}
                                    size={20}
                                    className="cursor-pointer text-green-300"
                                  />
                                </Tooltip>
                              </div>
                            )}
                          </div>

                          {/* File Input */}
                          <div className="relative">
                            <InputField
                              control={control}
                              errors={errors}
                              name={`solvedAssignment.${index}.assignmentFile`}
                              label="Upload Assignment"
                              type="file"
                            />
                            {assignmentPdfUrl[index] && (
                              <div className="absolute top-0 right-0">
                                <Tooltip title="View Assignment">
                                  <FaFileImage
                                    onClick={() => {
                                      window.open(
                                        assignmentPdfUrl[index],
                                        "_blank"
                                      );
                                    }}
                                    size={20}
                                    className="cursor-pointer text-green-300"
                                  />
                                </Tooltip>
                              </div>
                            )}
                          </div>
                          {/* <InputField
                        control={control}
                        errors={errors}
                        name={`solvedAssignment.${index}.year`}
                        label="Year"
                        type="text"
                      /> */}
                          <InputField
                            control={control}
                            errors={errors}
                            name={`solvedAssignment.${index}.price`}
                            label="Price"
                            type="text"
                          />
                          {/* <InputField
                      control={control}
                      errors={errors}
                      name={`solvedAssignment.${index}.medium`}
                      label="Medium"
                      type="text"
                    />
                    <InputField
                      control={control}
                      errors={errors}
                      name={`solvedAssignment.${index}.course`}
                      label="Course"
                      type="text"
                    />
                    <InputField
                      control={control}
                      errors={errors}
                      name={`solvedAssignment.${index}.code`}
                      label="Code"
                      type="text"
                    />
                    <InputField
                      control={control}
                      errors={errors}
                      name={`solvedAssignment.${index}.title`}
                      label="Title"
                      type="text"
                    /> */}
                        </div>
                        {/* Remove Button */}
                        {showDeleteBtn && (
                          <div className="flex justify-end pr-3">
                            <Button
                              size="sm"
                              variant="outlined"
                              color="white"
                              className="bg-red-500 w-max p-2 ml-2 "
                              onClick={() => {
                                removeSolvedAssignment(index);
                                handleAssignmentProductDelete(index);
                              }} // Remove field
                            >
                              <MdDelete size={17} />
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <AIQuesPaperUpload
                  innerId={bookData}
                  medium={medium}
                  outerId={outerId}
                />

                <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md mt-5">
                  <p className="font-semibold py-2 ">Book Meta Details</p>
                </div>
                <div className="grid grid-cols-2 gap-3 bg-[#f5f7fb] rounded-lg mt-2 p-3">
                  <InputField
                    control={control}
                    errors={errors}
                    name="metaTitle"
                    label="Meta Title"
                    type="text"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="metaTag"
                    label="Meta Tags"
                    type="description"
                  />
                  <div className="col-span-2">
                    <InputField
                      control={control}
                      errors={errors}
                      name="metaDescription"
                      label="Meta Description"
                      type="description"
                      rows={5}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
                    <p className="font-semibold ">Review & Rating</p>
                    <Tooltip title="Add More Reviews" placement="left">
                      <Button
                        variant="gradient"
                        color="blue"
                        className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                        onClick={
                          () =>
                            appendReview({ name: "", rating: "", comment: "" }) // Append new field
                        }
                      >
                        <IoIosAddCircle size={17} />
                      </Button>
                    </Tooltip>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {reviewsFields.map((item, index) => (
                      <div
                        key={item.id}
                        style={{}}
                        className="bg-[#f5f7fb] p-2 rounded-md  mt-2 grid gap-3"
                      >
                        <InputField
                          control={control}
                          errors={errors}
                          name={`reviews[${index}].name`}
                          label="Name"
                          placeholder="Enter Name"
                          disabled={!isEditable}
                        />
                        <InputField
                          control={control}
                          errors={errors}
                          name={`reviews[${index}].rating`}
                          label="Rating"
                          type="numeric"
                          placeholder="Enter Rating"
                          options={mediumOptions} // Pass your rating options here
                          disabled={!isEditable}
                        />
                        <InputField
                          control={control}
                          errors={errors}
                          name={`reviews[${index}].comment`}
                          label="Description"
                          type="description"
                          placeholder="Enter Comment"
                          disabled={!isEditable}
                        />
                        {showDeleteBtn && (
                          <div className="w-full flex justify-end ">
                            <Button
                              size="sm"
                              variant="outlined"
                              color="white"
                              className="bg-red-500 w-max p-2 ml-2 "
                              onClick={() => removeReview(index)}
                            >
                              <MdDelete size={17} />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {showDeleteBtn && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      className="primary-gradient mt-4 mb-4 capitalize"
                      onClick={handleMediumDelete}
                    >
                      Delete {medium} book
                    </Button>
                  </div>
                )}
              </div>

              <div></div>

              {/* <div className="mt-4">
        <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
          <p className="font-semibold">Quiz </p>
          <Tooltip title="Add Solved Paper">
            <Button
              variant="gradient"
              color="blue"
              className="p-3 flex justify-center items-center primary-gradient gap-x-1"
              onClick={
                () =>
                  addQuestion({
                    title: "",
                    content: null,
                  }) // Append new field
              }
            >
              <IoIosAddCircle size={17} />
            </Button>
          </Tooltip>
        </div>
        <div>
          {questions.map((question, questionIndex) => (
            <div
              key={question.id}
              className="flex flex-col gap-3 bg-[#f5f7fb] p-4 rounded-lg relative h-max "
            >
              <InputField
                name={`questions.${questionIndex}.question`}
                control={control}
                errors={errors}
                label={`Question ${questionIndex + 1}`}
                placeholder="Enter question"
                type="description"
              />

              <div>
                <h4 className="mb-2">Options</h4>
                <div className="flex gap-3">
                  {question.options.map((_, optionIndex) => (
                    <InputField
                      key={optionIndex}
                      name={`questions.${questionIndex}.options.${optionIndex}`}
                      control={control}
                      errors={errors}
                      // label={`Option ${optionIndex + 1}`}
                      placeholder={`Enter option ${optionIndex + 1}`}
                      type="description"
                    />
                  ))}
                </div>
              </div>
              <InputField
                name={`questions.${questionIndex}.correctAnswer`}
                control={control}
                errors={errors}
                label="Correct Answer"
                placeholder="Enter the correct answer"
                type="description"
              />
              <Button
                type="button"
                onClick={() => removeQuestion(questionIndex)}
                className="bg-red-500 w-max p-2"
              >
                <MdDelete size={17} />
              </Button>
            </div>
          ))}
        </div>
      </div> */}

              <div className="flex  gap-2">
                <Button
                  type="submit"
                  className="primary-gradient mt-4 mb-4"
                  loading={isLoading}
                >
                  Save
                </Button>
                {/* <Button
              type="button"
              className="primary-gradient mt-4 mb-4"
              onClick={() => setIsEditable(!isEditable)}
            >
              Edit
            </Button> */}
              </div>
            </form>

            {/* <button>
      <h1 className="mt-7 text-black-800 text-[20px]">Review & Rating</h1>
    </button> */}
            {/* <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 ">
      <InputField
        control={control}
        errors={errors}
        name="Name"
        label="Name"
        placeholder="Name"
      />
      <InputField
        control={control}
        errors={errors}
        name="Rating"
        label="Rating"
        type="text"
        placeholder="******"
        options={mediumOptions}
      />
      <InputField
        control={control}
        errors={errors}
        name="description"
        label="Description"
        type="description"
        placeholder="Description"
      />
    </div> */}

            {/* <Button type="submit" className="primary-gradient mt-4 mb-4">
      Submit
    </Button> */}
          </div>
        </>
      ) : (
        <div className="h-[75vh] w-full flex justify-center items-center">
          <p>Loading ...</p>
        </div>
      )}
    </PageCont>
  );
};

export default UpdateBook;
