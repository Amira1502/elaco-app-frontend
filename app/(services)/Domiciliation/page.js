"use client";
import React from "react";

export default function DomiciliationPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Nos offres de Domiciliation</h1>
      <div className="space-y-8">
        <div className="border rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Domiciliation Simple</h2>
          <p className="mb-1">Adresse professionnelle</p>
          <p className="font-bold text-lg">40 DT HT / mois</p>
          <button
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-grey"
            onClick={() => window.location.href = "/contact"}
          >
            Contactez-nous
          </button>
        </div>
        <div className="border rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Domiciliation Gold</h2>
          <p className="mb-1">Adresse + 6h salle de réunion</p>
          <p className="font-bold text-lg">80 DT / mois</p>
          <button
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-grey"
            onClick={() => window.location.href = "/contact"}
          >
            Contactez-nous
          </button>
        </div>
        <div className="border rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Domiciliation Silver</h2>
          <p className="mb-1">Création d’entreprise + adresse</p>
          <p className="font-bold text-lg">1000 DT HT</p>
          <button
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-grey-700"
            onClick={() => window.location.href = "/contact"}
          >
            Contactez-nous
          </button>
        </div>
      </div>
    </div>
  );
}