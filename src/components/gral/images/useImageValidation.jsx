import { useState, useCallback } from 'react';

const useImageValidation = (maxSizeMB = 2) => {
  const [error, setError] = useState(null);

  const validateImage = useCallback((file) => {
    if (!file) {
      setError("Por favor, selecciona una imagen.");
      return false;
    }

    const permittedExtensions = ["jpg", "jpeg", "png", "webp"];
    const nameFile = file.name.toLowerCase();
    const extension = nameFile.substring(nameFile.lastIndexOf(".") + 1);
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (!permittedExtensions.includes(extension)) {
      setError(
        `Por favor, agregar una imagen con una de las siguientes extensiones: ${permittedExtensions.join(
          ", "
        )}.`
      );
      return false;
    }

    if (file.size > maxSizeBytes) {
      setError(`El tamaño máximo de la imagen debe ser de ${maxSizeMB}MB.`);
      return false;
    }

    setError(null); // Limpiar el error si la validación es exitosa
    return true;
  }, [maxSizeMB]);

  return { validateImage, error };
};

export default useImageValidation;