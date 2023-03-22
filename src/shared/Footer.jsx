import './../static/css/footer.css'

const Footer = (props) => {
    
    return (
        <div className={`navbar ${ props.class === 'bot' ? 'navbar-foot' : props.class === 'forced' ? 'navbar-foot-forced' : 'navbar-foot-float'} 
            navbar-expand-lg navbar-dark bg-dark`}>
            <p>© {new Date().getFullYear()} - Creado por <a href="https://www.linkedin.com/in/manuel-s-mu%C3%B1oz-cobos-63b1781b7/">Manuel Muñoz</a>
            </p>
        </div>       
    )
};

export default Footer;
