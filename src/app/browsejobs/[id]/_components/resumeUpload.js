// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { createClient } from "@/utils/supabase/client";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function ResumeUpload({
//   jobId,
//   title,
//   description,
//   jobDescription,
// }) {
//   const [resume, setResume] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const supabase = createClient();

//   // Handle file selection
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setResume(file);
//       console.log("Selected file:", file);
//     }
//   };

//   // Function to upload the file to Supabase and store application in the database
//   const handleUpload = async () => {
//     if (!resume) {
//       alert("Please select a resume to upload.");
//       return;
//     }

//     setUploading(true);

//     try {
//       // Upload resume to Supabase storage
//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from("resume")
//         .upload(`public/${resume.name}`, resume);

//       if (uploadError) {
//         console.error("Error uploading file:", uploadError.message);
//         alert("Error uploading resume. Please try again.");
//         return;
//       }

//       const resumeUrl = `https://YOUR_SUPABASE_URL/storage/v1/object/public/resume/${resume.name}`;

//       // Get the logged-in user
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       // Insert application details into the 'applications' table
//       const { data: applicationData, error: applicationError } = await supabase
//         .from("application")
//         .insert({
//           job_id: jobId,
//           title: title,
//           description: description,
//           job_description: jobDescription,
//           resume_link: resumeUrl,
//         });

//       if (applicationError) {
//         console.error("Error saving application:", applicationError.message);
//         alert("Error saving application. Please try again.");
//       } else {
//         console.log("Application saved successfully:", applicationData);
//         alert("Resume uploaded and application submitted successfully!");
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert("An error occurred while uploading the file.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex w-full max-w-lg items-center">
//       <Label htmlFor="resume">
//         <span className="text-red-500 text-sm/[20px] px-1">*</span>Resume
//       </Label>
//       <Input
//         type="file"
//         onChange={handleFileChange}
//         accept=".pdf,.doc,.docx"
//         className="ml-12"
//       />
//       <Button onClick={handleUpload} className="ml-2 bg-blue-700 text-white w-40" disabled={uploading}>
//         {uploading ? "Uploading..." : "Upload Resume"}
//       </Button>
//     </div>
//   );
// }






"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResumeUpload({ resume, setResume }) {
  const supabase = createClient();

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
      console.log("Selected file:", file);
    }
  };

  return (
    <div className="flex w-full max-w-lg items-center">
      <Label htmlFor="resume">
        <span className="text-red-500 text-sm/[20px] px-1">*</span>Resume
      </Label>
      <Input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        className="ml-12"
      />
    </div>
  );
}
