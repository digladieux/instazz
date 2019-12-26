import Swal from 'sweetalert2';


export const SignInSocialNetwork: any = (html: any) => Swal.fire({
    html: html,
    width: 'auto',
    focusConfirm: false,
});

export const CopyToClipboardAlert: any = () => Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Information copy past to clipboard',
    showConfirmButton: false,
    timer: 1000,
    customClass: {
        actions: 'centerClass'
    }
});

export const AlertGuestAccount: any = () => Swal.fire({
    icon: 'info',
    title: 'Thank you for your connection at OrcaWise Dashboard!',
    html: 'You need to fulfill this form to know you better before using this dashboard',
    customClass: {
        actions: 'centerClass'
    }
});

export const CloseLoader: any = () => {
    Swal.close();
}

export const ShowLoader: any = () => {
    Swal.fire({
        title: 'Request to the server',
        html: 'Finish soon ...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
        customClass: {
            actions: 'centerClass'
        }
    });
}

export const ErrorAlert: any = (text: any) => {
    return Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: text,
        confirmButtonColor: '#06cff1',
        customClass: {
            actions: 'centerClass'
        }
    });
}

export const RequestSuccess: any = (title: string) => {
    return Swal.fire({
        title: title,
        icon: 'success',
        confirmButtonColor: '#06cff1',
        confirmButtonText: 'Ok',
        customClass: {
            actions: 'centerClass'
        }
    })
}



export const WarningAlert: any = (title: string, text: string) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#06cff1',
        cancelButtonColor: '#FF0000',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete',
        customClass: {
            actions: 'centerClass'
        }
    });
}
