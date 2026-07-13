"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Upload, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar"; 
import { DocumentItem } from "@/app/dashboard/types"; 

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocuments = useCallback(async () => {
    setLoadingDocs(true);
    try {
      const res = await fetch('/api/documents');
      if (!res.ok) throw new Error('Failed to fetch documents.');
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDocs(false);
    }
  }, []);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      // Refresh documents list after successful upload
      await fetchDocuments();

    } catch (err: any) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated") {
      fetchDocuments();
    }
  }, [status, router, fetchDocuments]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <Loader2 size={40} className="text-white animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // or a redirect component
  }

  return (
    <div className="flex min-h-screen bg-dark-bg text-white">
      <Sidebar /> 
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">My Documents</h2>
          <button 
            onClick={handleFileSelect}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-gray-500"
          >
            {uploading ? <Loader2 className="animate-spin" /> : <Upload size={18} />}
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.txt,.md,.csv"
          />
        </div>
        {uploadError && <p className="text-red-500 mb-4">Upload Error: {uploadError}</p>}
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 mt-6">
          {loadingDocs ? (
            <div className="p-8 text-center text-gray-400">Loading documents...</div>
          ) : documents.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p>You have no documents yet.</p>
              <p>Click 'Upload' to get started.</p>
            </div>
          ) : (
            <ul>
              {documents.map((doc) => (
                <li key={doc.id} className="border-b border-gray-700 last:border-b-0">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{doc.fileName}</p>
                      <p className="text-sm text-gray-400">
                        {doc.fileSize} bytes - Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <CheckCircle2 className="text-purple-400" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

