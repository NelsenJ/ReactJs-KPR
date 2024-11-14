// Homepage.jsx
import { useNavigate } from "react-router-dom";
import "./style.css";
import Footer from "../items/footer";
import Header from "../items/header";  // sesuaikan path sesuai struktur folder
import 'boxicons';

export default function Homepage() {
    const navigate = useNavigate();

    const handleKPRClick = () => {
        navigate('/KPR');
    };
    const Pensiun = () => {
        navigate('/PENSI')
    }

    return (
        <>
            <Header />

            <div className="main">
                <div className="introduction">
                    <div className="introduction-biodata">
                        <h1>Hi, Namaku</h1>
                        <h1>gavin</h1>
                        <p>Pelajar Ignatius Global School Palembang</p>
                        <p>di Jurusan Komputer</p>
                    </div>
                    <img 
                        className="introduction-image" 
                        src="https://www.ignatiusglobal.sch.id/media_library/images/09666a0849a5cc9a158cf4077a779ea9.png" 
                        alt="my mascot"
                    />
                </div>

                <div className="feature">
                    <div className="feature-title">Apa Mimpimu?</div>
                    <div className="feature-list">
                        <div className="item">
                            <img src="https://feliciaputritjiasaka.com/assets/icon/launcher/pendidikan-anak.webp" alt="Pendidikan Anak" />
                            <p>Pendidikan Anak</p>
                        </div>
                        <div className="item" onClick={handleKPRClick}>
                            <img src="https://feliciaputritjiasaka.com/assets/icon/launcher/simulasi-kpr.webp" alt="Simulasi KPR" />
                            <p>Simulasi KPR</p>
                        </div>
                        <div className="item">
                            <img src="https://feliciaputritjiasaka.com/assets/icon/launcher/annuity.webp" alt="Kalkulator Investasi" />
                            <p>Kalkulator Investasi</p>
                        </div>
                        <div className="item">
                            <img src="https://feliciaputritjiasaka.com/assets/icon/launcher/dana-darurat.webp" alt="Dana Darurat" />
                            <p>Dana Darurat</p>
                        </div>
                        <div className="item">
                            <img src="https://feliciaputritjiasaka.com/assets/icon/launcher/dp-properti.webp" alt="DP Properti" />
                            <p>DP Properti</p>
                        </div>
                        <div className="item">
                            <img src="https://feliciaputritjiasaka.com/assets/icon/launcher/menikah.webp" alt="Menikah" />
                            <p>Menikah</p>
                        </div>
                        <div className="item" onClick={Pensiun}>
                            <img src="https://feliciaputritjiasaka.com/assets/icon/launcher/dana-pensiun.webp" alt="Dana Pensiun" />
                            <p>Dana Pensiun</p>
                        </div>
                        <div className="item">
                            <img src="https://feliciaputritjiasaka.com/assets/icon/launcher/kendaraan.webp" alt="Kendaraan" />
                            <p>Kendaraan</p>
                        </div>
                        <div className="item">
                            <img src="https://feliciaputritjiasaka.com/assets/icon/launcher/barang.webp" alt="Barang" />
                            <p>Barang</p>
                        </div>
                    </div>
                    
                    <div className="feature-title-coming-soon">Segera Hadir</div>
                    <div className="feature-list-coming-soon">
                        <div className="item-coming-soon">
                            <div className="coming-soon"><p>Coming Soon</p></div>
                            <p>Liburan</p>
                        </div>
                        <div className="item-coming-soon">
                            <div className="coming-soon"><p>Coming Soon</p></div>
                            <p>Pendidikan</p>
                        </div>
                        <div className="item-coming-soon"></div>
                    </div>
                </div>

                <div className="cerita">
                    <div className="cerita-title">Video #CeritaUang</div>
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/B9XGUpQZY38?si=TjSQ0OAGu2Z0hgMU" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <hr />
            <Footer />
        </>
    );
}