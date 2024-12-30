import React from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";

 function Modal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <>
            <Button onClick={handleOpen} className="primary-gradient">Home Popup</Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Popup
                        </Typography>
                        <Typography className="-mb-2"variant="h6">
                            Home Image
                        </Typography>
                        <Input label="popup" type="file"  size="lg" />
                        <Typography className="-mb-2" variant="h6">
                            Text
                        </Typography>
                        <Input label="Text" size="lg" />
                        {/* <div className="-ml-2.5 -mt-3">
                            <Checkbox label="Remember Me" />
                        </div> */}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleOpen} fullWidth>
                            Submit
                        </Button>
                        
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}
export default Modal;