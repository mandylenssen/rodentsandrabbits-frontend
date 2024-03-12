import {addMonths, addYears} from "date-fns";

export const validatePhoto = (value) => {
    if (value && value.length > 0) {
        const file = value[0];
        const fileName = file.name;
        if (fileName) {
            const allowedExtensions = ['jpg', 'jpeg', 'png'];
            const fileExtension = fileName.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                return 'Invalid file format. Please upload a JPG or PNG file.';
            }
            const maxFileSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxFileSize) {
                return 'File is too large. Max 5MB allowed.';
            }
        }
        return true;
    }
    return 'Please upload a photo of your pet.';
};

export const validateDateOfBirth = (value) => {
    const dateOfBirth = new Date(value);
    const today = new Date();
    const minDate = addYears(today, -20);
    const maxDate = addMonths(today, -3);

    if (dateOfBirth < minDate) {
        return 'Date of birth must be less than 20 years ago.';
    }

    if (dateOfBirth > maxDate) {
        return 'Date of birth must be at least 3 months ago.';
    }

    return true;
};
