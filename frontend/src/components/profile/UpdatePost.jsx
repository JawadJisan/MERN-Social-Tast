import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useUpdatePostMutation } from "../../features/post/postAPI";

function UpdatePost({ modalOpened, setModalOpened, post }) {
    const theme = useMantineTheme();

    const { comments, description, image, likes, title, createdAt, _id } = post || {}

    const [updatePost, { }] = useUpdatePostMutation();
    const { user } = useSelector((state) => state.users)


    const [upTitle, setUpTitle] = useState(title);
    const [upDescrip, setUpDescrip] = useState(description);


    const [imgPrev, setImgPrev] = useState(null);


    const handleImage = event => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.set('image', image);
        axios.post('https://api.imgbb.com/1/upload?key=87dddf2da47f63b4b871952317bd5a8b', formData)
            .then(res => {
                setImgPrev(res.data.data.display_url)
            })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (imgPrev !== null) {
            updatePost({
                id: _id,
                title: upTitle,
                description: upDescrip,
                image: imgPrev
            })
            toast.success("profile update successfull");
        } else {
            updatePost({
                id: _id,
                title: upTitle,
                description: upDescrip,
                image: image
            })
            toast.success("profile update successfull");
        }
        setModalOpened(false)
    }


    return (
        <Modal
            overlayColor={
                theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}
            size="55%"
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <form onSubmit={handleSubmit} className="infoForm">
                <h3>Update Post</h3>

                <div>
                    <input
                        required
                        value={upTitle}
                        onChange={(e) => setUpTitle(e.target.value)}
                        type="text"
                        className="infoInput"
                        name="FirstName"
                        placeholder="First Name"
                    />
                </div>

                <div>
                    <input
                        required
                        value={upDescrip}
                        onChange={(e) => setUpDescrip(e.target.value)}
                        type="text"
                        className="infoInput"
                        name="worksAT"
                        placeholder="Works at"
                    />
                </div>


                <div>
                    Image
                    <input onChange={handleImage} type="file" name='profileImg' />
                </div>
                <img src={imgPrev == null ? image : imgPrev} alt="" />

                <button className="button infoButton">Update</button>
            </form>
        </Modal>
    );
}

export default UpdatePost;
