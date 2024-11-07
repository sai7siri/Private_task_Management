import React, { useContext } from "react";
import { Heart, PenBox, Trash2 } from "lucide-react";
import { Store } from "../Context";
import {
  updateImpartTask,
  updateCompleteTask,
  deleteTask,
  fetchCompleteData,
  fetchImportantData,
} from "../customsApi";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function Cards({ data, fetchImp, fetchCom }) {
  const { handleUpdate, refreshData } = useContext(Store);
  const location = useLocation();


  const handleImportant = async (task) => {
    try {
      const { success, message } = await updateImpartTask(task, task._id);
      if (success) {
        toast.success(message);
        if (location.pathname === "/home/important") {
          fetchImp();
        }
        refreshData();
      } else {
        toast.error("Failed to update");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleComplete = async (task) => {
    try {
      const { success, message } = await updateCompleteTask(task, task._id);
      if (success) {
        toast.success(message);
        if (location.pathname === "/home/complete") {
          fetchCom();
        }
        refreshData();
      } else {
        toast.error("Failed to update");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await deleteTask(id);
      if (success) {
        toast.success(message);
        if (location.pathname === "/home/complete") {
          fetchCom();
        } else if (location.pathname === "/home/important") {
          fetchImp();
        } else {
          refreshData();
        }
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 m-6">
      {data && data.length > 0 ? (
        data.map((item, i) => (
          <div key={i} className="border border-dotted border-gray-600 p-3 rounded-md shadow-md">
            <p className="font-bold font-mono capitalize text-blue-500 text-xl">
              Title : {item.title}
            </p>
            <p className="text-md text-zinc-600 w-full font-serif"> Desc : {item.desc}</p>
            <div className="flex items-center gap-6 py-2">
              {location.pathname === "/home/important" ? null : (
                <>
                  <button
                    onClick={() => handleComplete(item)}
                    className={`${
                      item.complete ? "bg-green-600" : " bg-red-600"
                    } px-6 py-2 rounded-sm text-white`}
                  >
                    {item.complete ? "Completed" : "Incomplete"}
                  </button>
                </>
              )}

              {location.pathname === "/home/complete" ? null : (
                <>
                  <p>
                    <Heart
                      onClick={() => handleImportant(item)}
                      className={
                        item.important
                          ? "fill-red-600 text-red-500"
                          : "fill-white"
                      }
                    />
                  </p>
                </>
              )}

              {location.pathname === "/home" && (
                <p>
                  <PenBox onClick={() => handleUpdate(item)} />
                </p>
              )}

              <p>
                <Trash2 onClick={() => handleDeleteTask(item._id)} />
              </p>
            </div>
          </div>
        ))
      ) : (
        <span className="text-red-600 font-medium">No tasks available </span>
      )}
    </div>
  );
}

export default Cards;
