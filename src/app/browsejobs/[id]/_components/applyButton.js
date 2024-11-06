"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Modal from "./modal";

export default function ApplyButton({ job, JobId, title, email, phoneNo }) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleApplyClick = () => {
    setIsModalVisible(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); 
  };

  return (
    <div>
      <Button
        type="button"
        className="bg-blue-700 text-white w-60 ml-8 mt-5 mb-4"
        onClick={handleApplyClick}
      >
        Apply
      </Button>
      {isModalVisible && (
        <Modal
          job={job}
          JobId={JobId}
          title={title}
          email={email}
          phoneNo={phoneNo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}
