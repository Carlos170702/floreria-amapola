import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600">Página no encontrada</p>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/floreria-amapola.appspot.com/o/%E2%80%94Pngtree%E2%80%94space%20planet%20astronaut%20error%20404_5330069.png?alt=media&token=bdd879e4-649f-45c4-8652-dfe2c87c6511"
        alt="Error 404"
        className="mt-8 w-64"
      />
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Volver al inicio
      </button>
    </div>
  );
};
