import toast from 'react-hot-toast';

const icons = {
    info: { icon: 'ℹ️', color: '#1976d2', backgroundColor: '#e3f2fd', borderColor: '#1976d2' },
    success: { icon: '✔️', color: '#388e3c', backgroundColor: '#e8f5e9', borderColor: '#388e3c'  },
    error: { icon: '❌', color: '#d32f2f', backgroundColor: '#ffcdd2', borderColor: '#d32f2f'  },
    loading: { icon: '⏳', color: '#ffa000', backgroundColor: '#fffde7', borderColor: '#ffa000'  },
};

const releaseToast = (message, type) => toast.custom(() => (

    <div
        style={{
            position: 'bottom-center',
            width: window.innerWidth < 768 ? '320px' : '500px',
            padding: '16px',
            background: icons[type].backgroundColor,
            color: icons[type].color,
            borderRadius: '10px',
            border: '2px solid ' + icons[type].borderColor
        }}
    >
        {icons[type].icon}
        &nbsp;
        {message}
    </div>
    ));


export default releaseToast;