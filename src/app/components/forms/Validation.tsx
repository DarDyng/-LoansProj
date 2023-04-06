import * as yup from 'yup';

function configureValidations() {
    yup.addMethod(yup.StringSchema, 'firstLetterUppercase', function () {
        return this.test('first-letter-uppercase', "First letter should be uppercase", function (value: string) {
            if (value && value.length > 0) {
                const firstLetter = value.substring(0, 1);
                return firstLetter === firstLetter.toUpperCase();
            }
        });
    })
}

export default configureValidations;