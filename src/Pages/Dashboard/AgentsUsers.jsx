import React, { useState, useEffect } from "react";
import { usePagination } from "../../hooks/usePagination";
import useSearch from "../../hooks/useSearch";
import Search from "../../components/common/components/ui/DashSearch";
import { CiCirclePlus } from "react-icons/ci";
import ReusableTable from "../../components/common/components/ui/ReusableTableUsers";
import { getUsers } from "../../services/auth/users";
import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";
import Select from "react-select";
import UserEditModal from "../../components/common/components/ui/EditUserModel";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import i18n from "../../components/common/components/LangConfig";

const clampAvatars = (avatars, options = { max: 5 }) => {
  const { max = 5, total } = options;
  let clampedMax = max < 2 ? 2 : max;
  const totalAvatars = total || avatars.length;
  if (totalAvatars === clampedMax) {
    clampedMax += 1;
  }
  clampedMax = Math.min(totalAvatars + 1, clampedMax);
  const maxAvatars = Math.min(avatars.length, clampedMax - 1);
  const surplus = Math.max(
    totalAvatars - clampedMax,
    totalAvatars - maxAvatars,
    0
  );
  return { avatars: avatars.slice(0, maxAvatars).reverse(), surplus };
};

const AllAgents = () => {
  const [perPage, setPerPage] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const { query, handleSearch, filteredData } = useSearch(allUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      const managers = users?.filter((user) => user.role === "manager");
      setAllUsers(managers);
    } catch (error) {
      console.log("failed to fetch users");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("users==", allUsers);
  useEffect(() => {
    const handleResize = () => {
      setPerPage(
        window.innerWidth > 430 ? 5 : window.innerWidth >= 1200 ? 2 : 1
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortUsers = (users, order) => {
    if (order === "all") {
      return users;
    }
    return users.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === "newest" ? dateB - dateA : dateA - dateB;
    });
  };

  const filterUsers = (users) => {
    return users.filter((user) => {
      const roleMatch =
        selectedRoles.length === 0 || selectedRoles.includes(user.role);
      const statusMatch =
        selectedStatuses.length === 0 || selectedStatuses.includes(user.status);
      return roleMatch && statusMatch;
    });
  };

  const sortedUsers = sortUsers(filteredData, sortOrder);
  const filteredUsers = filterUsers(sortedUsers);

  const { activePage, nextPage, previousPage, totalPages, setActivePage } =
    usePagination(filteredUsers, 1, perPage);

  const goToPage = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleSortChange = (selectedOption) => {
    setSortOrder(selectedOption.value);
  };

  const usersWithAvatars = allUsers.map((user) => ({
    alt: `${user.firstname} ${user.lastname}`,
    src: user.profilePic,
  }));

  const { avatars, surplus } = clampAvatars(usersWithAvatars, {
    max: 3,
    total: allUsers.length,
  });

  const toggleRoleDropdown = () => {
    setRoleDropdownOpen(!roleDropdownOpen);
    setStatusDropdownOpen(false);
  };

  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(!statusDropdownOpen);
    setRoleDropdownOpen(false);
  };

  const handleRoleChange = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleStatusChange = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const roleOptions = [
    { value: "manager", label: "Manager" },
    { value: "client", label: "Client" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "all", label: "All Users" },
  ];

  const columns = [
    {
      header: `${i18n.t("dashboard.users.profile")}`,
      accessor: "profilePic",
      render: (profilePic) => (
        <img
          src={profilePic}
          alt="User profile"
          className="h-8 w-8 rounded-full"
        />
      ),
    },
    {
      header: `${i18n.t("dashboard.users.userId").slice(0,6)}...`,
      accessor: "_id",
      render: (id) => `${id.slice(0, 7)}...`,
    },
    {
      header: `${i18n.t("dashboard.users.firstName")}`,
      accessor: "firstname",
    },
    {
      header: `${i18n.t("dashboard.users.lastName")}`,
      accessor: "lastname",
    },
    {
      header: `${i18n.t("dashboard.users.email")}`,
      accessor: "email",
    },
    {
      header: `${i18n.t("dashboard.users.phoneNumber")}`,
      accessor: "phoneNumber",
    },
    {
      header: `${i18n.t("dashboard.users.role")}`,
      accessor: "role",
    },
    {
      header: `${i18n.t("dashboard.users.status")}`,
      accessor: "isActive",
      render: (isActive) => (
        <p
          className={`h-fit text-center w-fit px-2 py-1 rounded-lg text-white font-medium ${
            isActive ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </p>
      ),
    },
    {
      header: `${i18n.t("dashboard.users.joinedAt")}`,
      accessor: "createdAt",
      render: (date) =>
        new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
    },
  ];

  return (
    <section className="mx-7 mt-5 rounded-lg p-4 max-w-[1440px] w-full">
      <div className="flex justify-between text-slate-600 dark:text-gray-300 mb-10">
        <div className="flex gap-2 w-[20%]">
          <h1 className="text-lg font-bold">All Managers:</h1>
          <AvatarGroup max={3} className="ml-4">
            {avatars.map((avatar, index) => (
              <Avatar
                key={index}
                alt={avatar.alt}
                src={avatar.src}
                sx={{ width: "30px", height: "30px" }}
              />
            ))}
            {!!surplus && <Avatar>+{surplus}</Avatar>}
          </AvatarGroup>
        </div>
        <div className="flex w-[80%]">
          <Search
            placeholder={"find a user ...."}
            handleSearch={handleSearch}
            value={query}
          />
          <div className="w-full flex justify-end items-center gap-2">
          <div className="flex items-center justify-center gap-2">
              <HiMiniAdjustmentsHorizontal className="h-5 w-5 " />
              <span className="text-center flex items-center justify-center mb-1">
                :
              </span>
            </div>
            <div className="relative flex items-center gap-8">
              <div className="relative">
                <button
                  onClick={toggleRoleDropdown}
                  className="flex gap-2 text-sm font-semibold items-center"
                >
                  <CiCirclePlus size={20} />
                  Role
                </button>
                {roleDropdownOpen && (
                  <div className="absolute bg-white border mt-2 p-2 z-10">
                    {roleOptions.map((role) => (
                      <div key={role.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={role.value}
                          checked={selectedRoles.includes(role.value)}
                          onChange={() => handleRoleChange(role.value)}
                        />
                        <label htmlFor={role.value} className="ml-2">
                          {role.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={toggleStatusDropdown}
                  className="flex gap-2 text-sm font-semibold items-center"
                >
                  <CiCirclePlus size={20} />
                  Status
                </button>
                {statusDropdownOpen && (
                  <div className="absolute bg-white border mt-2 p-2 z-10">
                    {statusOptions.map((status) => (
                      <div key={status.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={status.value}
                          checked={selectedStatuses.includes(status.value)}
                          onChange={() => handleStatusChange(status.value)}
                        />
                        <label htmlFor={status.value} className="ml-2">
                          {status.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Select
              className="text-gray-700 opacity-80"
                options={sortOptions}
                onChange={handleSortChange}
                defaultValue={sortOptions.find(
                  (option) => option.value === sortOrder
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <ReusableTable
        data={filteredUsers}
        columns={columns}
        formatDate={(date) =>
          new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        }
        handleEditClick={handleEditClick}
        userRole="admin" // or any role you want to pass
        pagination={{
          currentPage: activePage,
          totalPages,
          onPageChange: goToPage,
        }}
      />
      {isModalOpen && selectedUser && (
        <UserEditModal
          open={isModalOpen}
          handleClose={handleModalClose}
          user={selectedUser}
          fetchUsers={fetchUsers}
        />
      )}
    </section>
  );
};

export default AllAgents;
