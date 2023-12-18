import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const Committee = () => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingMember, setEditingMember] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({
    title: "",
    name: "",
    contact: "",
  });
  const token = localStorage.getItem("token");
  const isLoggedIn = token !== null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/committee/`
        );
        setIsLoading(false);
        setCommitteeMembers(data);
      } catch (err) {
        console.log(err);
        setShowError(true);
        setErrorMessage("Something went wrong, please try again later.");
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (member) => {
    setEditingMember(member);
    setUpdatedInfo({
      title: member.title,
      name: member.name,
      contact: member.contact,
    });
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/committee/${editingMember.id}/`,
        updatedInfo
      );
      const updatedMembers = committeeMembers.map((member) =>
        member.id === editingMember.id ? { ...member, ...data } : member
      );
      setCommitteeMembers(updatedMembers);
      setEditingMember(null);
      setUpdatedInfo({ title: "", name: "", contact: "" });
    } catch (err) {
      console.log(err);
      setShowError(true);
      setErrorMessage("Failed to update member information.");
    }
  };

  const handleAddMember = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/committee/`, updatedInfo);
      setCommitteeMembers([...committeeMembers, data]);
      setUpdatedInfo({ title: "", name: "", contact: "" });
    } catch (err) {
      console.log(err);
      setShowError(true);
      setErrorMessage("Failed to add a new committee member.");
    }
  };

  const handleDeleteMember = async (member) => {
    try {
      await axios.delete(`${API_URL}/committee/${member.id}/`);
      const updatedMembers = committeeMembers.filter(
        (committeeMember) => committeeMember.id !== member.id
      );
      setCommitteeMembers(updatedMembers);
      // window.location.reload();
    } catch (err) {
      console.log(err);
      setShowError(true);
      setErrorMessage("Failed to delete the committee member.");
    }
  };

  return (
    <div className="committee-page page">
      <div className="committee-content">
        <h1>Committee</h1>
        {isLoggedIn && (
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedInfo.title}
                onChange={(e) =>
                  setUpdatedInfo({
                    ...updatedInfo,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedInfo.name}
                onChange={(e) =>
                  setUpdatedInfo({
                    ...updatedInfo,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                value={updatedInfo.contact}
                onChange={(e) =>
                  setUpdatedInfo({
                    ...updatedInfo,
                    contact: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddMember}>
              Add Member
            </Button>
          </Form>
        )}
        {isLoading ? (
          <p>Loading committee members...</p>
        ) : (
          <ul className="committee-members-list">
            {committeeMembers.map((committeeMember) => (
              <li key={committeeMember.id}>
                {editingMember === committeeMember ? (
                  <Form>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={updatedInfo.title}
                        onChange={(e) =>
                          setUpdatedInfo({
                            ...updatedInfo,
                            title: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={updatedInfo.name}
                        onChange={(e) =>
                          setUpdatedInfo({
                            ...updatedInfo,
                            name: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Contact</Form.Label>
                      <Form.Control
                        type="text"
                        value={updatedInfo.contact}
                        onChange={(e) =>
                          setUpdatedInfo({
                            ...updatedInfo,
                            contact: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Button variant="success" onClick={handleUpdate}>
                      Update
                    </Button>
                  </Form>
                ) : (
                  <ul className="committee-member">
                    <li className="committee-title">
                      {" "}
                      {committeeMember.title}
                    </li>
                    <li> {committeeMember.name}</li>
                    <li> {committeeMember.contact}</li>
                    {isLoggedIn && (
                      <>
                        <Button
                          variant="success"
                          onClick={() => handleEditClick(committeeMember)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteMember(committeeMember)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {showError && <p>{errorMessage}</p>}
    </div>
  );
};

export default Committee;
