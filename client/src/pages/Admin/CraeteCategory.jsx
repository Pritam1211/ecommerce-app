import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import styled from "styled-components";
import axios from "axios";
import { environment } from "./../../environment";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import { Colors } from "../../constants/Colors";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [category, setCategory] = useState(undefined);
  const [name, setName] = useState("");

  const getCategories = async () => {
    try {
      const res = await axios.get(`${environment.apiUrl}category/`);
      if (res?.data?.success) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      toast.error("Something Went wrong please try again");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (isEdit) {
        const res = await axios.put(
          `${environment.apiUrl}category/${category._id}`,
          { name: name }
        );
        if (res?.data?.success) {
          toast.success(`${category.name} is change to ${res.data.category.name}`);
        }
        setIsEdit(false);
        setCategory(undefined);
      } else {
        const res = await axios.post(`${environment.apiUrl}category/`, {
          name: name,
        });
        if (res?.data?.success) {
          toast.success(`${res.data.category.name} category created`);
        }
      }
      getCategories();
      setName("");
    } catch (err) {
      toast.error("Something Went wrong please try again");
    }
  };

  const handleEdit = (index) => {
    setCategory(categories[index]);
    setIsEdit(true);
    console.log(categories[index])
    setName(categories[index].name)
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${environment.apiUrl}category/${id}`);
      if (res?.data?.success) {
        toast.success(`Category deleted successfully`);
      }
      getCategories();
    } catch (err) {
      toast.error("Something Went wrong please try again");
    }
  };

  return (
    <Layout>
      <Container>
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <CategoryForm
            name={name}
            setName={setName}
            isEdit={isEdit}
            handleSubmit={handleSubmit}
          />
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                return (
                  <tr key={category._id}>
                    <td>{index + 1}</td>
                    <td className="w-50">{category.name}</td>
                    <td>
                      <button className="btn button" onClick={(e) => handleEdit(index)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={(e) => handleDelete(category._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 3rem;
  align-items: center;
  .menu {
    width: 20%;
  }
  .content {
    width: 70%;

        th {
          background-color: ${Colors.coral};
          color: #fff;
        }


    .btn {
      background-color: ${Colors.spicedApple};
      color: white;
      padding: 0.3rem 0%.5;
      border: none;
      margin-right: 1rem;
      cursor: pointer;
      border-radius: 0.4rem;
      text-transform: uppercase;
      &:hover {
        background-color: ${Colors.peach};
      }
    }
  }
`;
export default CreateCategory;
