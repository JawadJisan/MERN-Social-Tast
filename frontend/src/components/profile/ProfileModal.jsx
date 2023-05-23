import { Modal, useMantineTheme } from "@mantine/core";
import { useUpdateInfoMutation } from "../../features/user/userAPI";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  const [updateInfo, { }] = useUpdateInfoMutation();
  const { user } = useSelector((state) => state.users)


  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [worksAt, setWorksAt] = useState('');
  const [livesIn, setLivesIn] = useState('');
  const [country, setCountry] = useState('');
  const [relation, setRelation] = useState('');


  const [file, setFile] = useState("");
  const [imgPrev, setImgPrev] = useState(null);
  const [coverPrev, setcoverImgPrev] = useState(null);


  const handleImage = event => {
    // setFile(event.target.files[0]);
    const image = event.target.files[0];
    const formData = new FormData();
    formData.set('image', image);
    axios.post('https://api.imgbb.com/1/upload?key=87dddf2da47f63b4b871952317bd5a8b', formData)
      .then(res => {
        setImgPrev(res.data.data.display_url)
      })
  }

  const handleCover = event => {
    // setFile(event.target.files[0]);
    const image = event.target.files[0];
    const formData = new FormData();
    formData.set('image', image);
    axios.post('https://api.imgbb.com/1/upload?key=87dddf2da47f63b4b871952317bd5a8b', formData)
      .then(res => {
        setcoverImgPrev(res.data.data.display_url)
      })
  }




  const handleSubmit = (e) => {
    e.preventDefault();
    {/* info  info, id */ }
    updateInfo({
      info: {
        fName,
        lName,
        worksAt,
        livesIn,
        country,
        relation,
        imgPrev,
        coverPrev
      },
      id: user?._id
    })
    toast.success("profile update successfull");
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
        <h3>Your info</h3>

        <div>
          <input
            required
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            type="text"
            className="infoInput"
            name="FirstName"
            placeholder="First Name"
          />

          <input
            required
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            type="text"
            className="infoInput"
            name="LastName"
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            required
            value={worksAt}
            onChange={(e) => setWorksAt(e.target.value)}
            type="text"
            className="infoInput"
            name="worksAT"
            placeholder="Works at"
          />
        </div>

        <div>
          <input
            required
            value={livesIn}
            onChange={(e) => setLivesIn(e.target.value)}
            type="text"
            className="infoInput"
            name="livesIN"
            placeholder="LIves in"
          />

          <input
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            className="infoInput"
            name="Country"
            placeholder="Country"
          />
        </div>

        <div>
          <input
            required
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
          />
        </div>


        <div>
          Profile Image
          <input onChange={handleImage} type="file" name='profileImg' />
          Cover Image
          <input onChange={handleCover} type="file" name="coverImg" />
        </div>

        <button className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
