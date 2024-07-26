import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "~/components/common/Loading";
import { getAllUsers } from "~/services/UserService";

const ListUser = () => {
  const [users, setUsers] = useState([
    {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleName:""
    },
  ]);

  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchUsers();

  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await getAllUsers();
      setUsers(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const result = await deleteBrand(userId);
      if (!result) {
        setSuccessMessage(`id: ${userId} olan user silindi.`);
        fetchUsers();
      } else {
        console.error(`User silme başarısız. : ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };
  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMessage && (
          <p className="alert alert-success mt-5">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="alert alert-danger mt-5">{errorMessage}</p>
        )}
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Kullanıcılar listesi</h2>
            </div>

            <Row>
              <Col md={6} className="mb-2 md-mb-0">
                
              </Col>

              <Col md={6} className="d-flex justify-content-end">
                <Link to={"add-brand"}>
                  <FaPlus /> Add User
                </Link>
              </Col>
            </Row>

            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr className="text-center">
                    <th>ID</th>
                    <th>isim</th>
                    <th>soyisim</th>
                    <th>kullanıcı adı</th>
                    <th>password</th>
                    <th>Rolü</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.userId} className="text-center">
                      <td>{user.userId}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.roleName}</td>
                      <td className="gap-2">
                        <Link to={`update/${user.userId}`} className="gap-2">
                          <span className="btn btn-info btn-sm">
                            <FaEye />
                          </span>
                          <span className="btn btn-warning btn-sm ml-5">
                            <FaEdit />
                          </span>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm ml-5"
                          onClick={() => {
                            handleDelete(user.userId);
                          }}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ListUser;
