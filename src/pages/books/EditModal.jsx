import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    Input,
    Option,
    Select,
    Button,
    Dialog,
    Textarea,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";

function EditModal(props) {
    const [open, setOpen] = useState(false); // Correct useState hook
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Button onClick={handleOpen} variant="gradient " className="primary-gradient">
                Add Reviews & Rating
            </Button>
            <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
                <DialogHeader className=" ">
                    <Typography variant="h4" color="blue-gray">
                        Book Reviews & Rating
                    </Typography>

                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleOpen}
                    >
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6">
                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 text-left font-medium"
                        >
                            Name
                        </Typography>
                        <Input
                            color="gray"
                            size="lg"
                            placeholder="eg. White Shoes"
                            name="name"
                            className="placeholder:opacity-100 focus:!border-t-gray-900"
                            containerProps={{
                                className: "!min-w-full",
                            }}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 text-left font-medium"
                        >
                            Rating
                        </Typography>
                        <Input
                            color="gray"
                            size="lg"
                            placeholder="Rating"
                            name="name"
                            className="placeholder:opacity-100 focus:!border-t-gray-900"
                            containerProps={{
                                className: "!min-w-full",
                            }}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 text-left font-medium"
                        >
                            Description (Optional)
                        </Typography>
                        <Textarea
                            rows={7}
                            placeholder="eg. This is a white shoes with a comfortable sole."
                            className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button className="ml-auto" onClick={handleOpen}>
                        Add Product
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default EditModal;
