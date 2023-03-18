import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import useDistrictList from '../hooks/useDistrictList';
import useStateList from '../hooks/useStateList';
import useVillageList from '../hooks/useVillageList';
import LoadSpinner from '../components/LoadSpinner';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function ShippingAddressNew() {
    const navigate = useNavigate();
    const [getProvince, setGetProvince] = useState([]);
    const [trackProvinceId, setTrackProvinceId] = useState('');
    const [trackStateId, setTrackStateId] = useState('');
    const [trackDistrict, setTrackDistrictId] = useState('');
    const [getState, statusGetState] = useStateList(trackProvinceId);
    const [getDistrict] = useDistrictList(trackStateId);
    const [getVillage] = useVillageList(trackDistrict);
    const [trackRegions, setTrackRegions] = useState({
        province : "",
        state : "",
        district : "",
        village : ""
    });
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getProvince = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/regions/getProvince`);
                setGetProvince(res.data.data);
            } catch (error) {
              
            }
        }
        getProvince();
    }, []);

    const handleSubmit = async (e) => {
        try {
            setIsLoading(true)
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formJSON = Object.fromEntries(formData.entries());
            formJSON.province = trackRegions.province;
            formJSON.state = trackRegions.state;
            formJSON.district = trackRegions.district;
            formJSON.village = trackRegions.village;
            formJSON.lat = location?.coordinates?.lat;
            formJSON.lng = location?.coordinates?.lng;

            await axios.post(`${process.env.REACT_APP_API_HOST}/customers/newAddress`, formJSON);
            setIsLoading(false)
            navigate("/customers/address");
      
        } catch (error) {
            setIsLoading(false);
            let errMsg = 'Internal Server Error'
            if (error.response?.status !== 500) {
                errMsg = error.response?.data?.metadata?.msg
            }
            
            toast.error(`Error ${error?.response?.status} - ${errMsg}`, {
                position: toast.POSITION.TOP_RIGHT
            });
        }

    }
    const getGeoLocation = () => {
        const onSuccess = (location) => {
            setLocation({
                loaded: true,
                coordinates: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                },
            });
        };
    
        const onError = (error) => {
            setLocation({
                loaded: true,
                error: {
                    code: error.code,
                    message: error.message,
                },
            });
        };

        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  return (
    <>
        <LoadSpinner
            isLoading = {isLoading}
        />
        <ToastContainer/>
        <div className='pt-20 mx-3 md:mx-14'>
            <form className=''
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col md:flex-row'>
                    <div className='basis-2/5'>
                        <p className='font-bold text-lg'>Kontak</p>
                        <div className="divider my-1"></div> 
                        <div className='flex flex-col'>
                            <div className="form-control">
                                <label className="label" htmlFor='recipient_name'>
                                    <span className="label-text">Nama Penerima</span>
                                </label>
                                <input type="text"
                                    name="recipient_name" 
                                    id="recipient_name" 
                                    placeholder="Nama Lengkap Penerima" 
                                    className="input input-bordered w-full" />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor='recipient_phone_number'>
                                    <span className="label-text">Nomor Telepon</span>
                                </label>
                                <input type="text"
                                    name="recipient_phone_number" 
                                    id="recipient_phone_number" 
                                    placeholder="Nomor Telepon Penerima" 
                                    className="input input-bordered w-full" />
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 md:mt-0 basis-2/5 md:ml-8' >
                        <p className='font-bold text-lg'>Alamat</p>
                        <div className="divider my-1"></div> 
                        <div className='flex flex-col'>
                            <div className="form-control">
                                <label className="label" htmlFor='street'>
                                    <span className="label-text">Nama Jalan</span>
                                </label>
                                <input type="text"
                                    name="street" 
                                    id="street" 
                                    placeholder="Alamat Jalan" 
                                    className="input input-bordered w-full" />
                            </div>
                            <div className='flex'>
                                <div className="form-control grow">
                                    <label className="label" htmlFor='province'>
                                        <span className="label-text">Provinsi</span>
                                    </label>
                                    <select className="select select-bordered w-full max-w-xs"
                                    id='province'
                                    name='province'
                                    defaultValue={"default"}
                                    onChange={(e) => {
                                        setTrackProvinceId(e.target.value);
                                        setTrackStateId('');
                                        setTrackDistrictId('');
                                        setTrackRegions({
                                            province : e.target.options[e.target.selectedIndex].text,
                                            state : "",
                                            district : "",
                                            village : ""
                                        })
                                    }}
                                    >
                                        <option disabled value={"default"}>Pilih Provinsi</option>
                                        {
                                            getProvince?.map((data,idx) => {
                                                return (
                                                    <option value={data.kode} key={idx}>{`${data.nama}`}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-control grow ml-2">
                                    <label className="label" htmlFor='state'>
                                        <span className="label-text">Kab/Kota</span>
                                    </label>
                                    <select className="select select-bordered w-full max-w-xs"
                                        defaultValue={"default"}
                                        id='state'
                                        name='state'
                                        onChange={(e) => {
                                            // let strBuilder = `${trackProvinceId}.${e.target.value}`;
                                            setTrackStateId(e.target.value);
                                            setTrackDistrictId('')
                                            setTrackRegions({
                                                province : trackRegions.province,
                                                state : e.target.options[e.target.selectedIndex].text,
                                                district : "",
                                                village : ""
                                            })
                                        }}
                                    >
                                        <option disabled value={"default"}>Pilih Kota/Kab</option>
                                    {
                                        statusGetState === 'loading' ? <option disabled>Sedang dimuat</option>
                                        :
                                        getState.map((data, idx) => {
                                            return (
                                                <option value={data.kode} key={idx}>{`${data.nama}`}</option>
                                            )
                                        })
                                    }
                                    </select>
                                </div>

                            </div>
                            <div className='flex'>
                                <div className="form-control grow">
                                    <label className="label" htmlFor='district'>
                                        <span className="label-text">Kecamatan</span>
                                    </label>
                                    <select className="select select-bordered w-full max-w-xs"
                                        defaultValue={'default'}
                                        name='district'
                                        id='district'
                                        onChange={(e) => {
                                            setTrackDistrictId(e.target.value);
                                            setTrackRegions({
                                                province : trackRegions.province,
                                                state : trackRegions.state,
                                                district : e.target.options[e.target.selectedIndex].text,
                                                village : ""
                                            })
                                        }}
                                    >
                                        <option disabled value={'default'}>Pilih Kecamatan</option>
                                    {
                                            getDistrict.map((data, idx) => {
                                                return (
                                                    <option value={data.kode} key={idx}>{`${data.nama}`}</option>
                                                )
                                            })
                                    }
                                    </select>
                                </div>
                                <div className="form-control grow ml-1">
                                    <label className="label" htmlFor='village'>
                                        <span className="label-text">Kelurahan</span>
                                    </label>
                                    <select className="select select-bordered w-full max-w-xs"
                                        defaultValue={'default'}
                                        id='village'
                                        name='village'
                                        onChange={(e) => {
                                            console.log('asdasdas', trackRegions);
                                            setTrackRegions({
                                                province : trackRegions.province,
                                                state : trackRegions.state,
                                                district : trackRegions.district,
                                                village : e.target.options[e.target.selectedIndex].text
                                            })
                                        }}
                                    >
                                        <option disabled value={'default'}>Pilih Kelurahan / Desa </option>
                                        {
                                            getVillage.map((data, idx) => {
                                                return (
                                                    <option value={data.kode} key={idx}>{`${data.nama}`}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor='postal_code'>
                                    <span className="label-text">Kode Pos</span>
                                </label>
                                <input type="text"
                                    name="postal_code" 
                                    id="postal_code" 
                                    placeholder="Kode pos" 
                                    className="input input-bordered w-full" />
                            </div>
                            {/* The button to open modal */}
                            {
                                location.coordinates?.lat && location.coordinates?.lng ? 
                                null :
                                <label htmlFor="my-modal-3"
                                className="btn mt-4 normal-case btn-outline btn-secondary"
                                onClick={getGeoLocation}
                                >Atur Alamat Maps
                                </label>

                            }
                            {/* Put this part before </body> tag */}
                            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                            <div className="modal">
                            <div className="modal-box relative">
                                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <h3 className="text-lg font-bold">Izin Akses Lokasi</h3>
                                <p className="py-4">Akses lokasi digunakan untuk pengiriman dengan metode <span className='font-bold'>Delivery Order</span></p>
                            </div>
                            </div>
                           {
                            location.coordinates?.lat && location.coordinates?.lng ? 
                            <div className=" p-0 mt-3">
                                <div className='flex text-left items-center'>
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-success mr-2"/>
                                    <span>Berhasil mendapatkan akses lokasi</span>
                                </div>
                            </div>
                            : null
                           }
                           {
                            location?.error ? 
                            <div className="alert bg-base-100">
                                <div>
                                    <FontAwesomeIcon icon={faTimesCircle} className="text-error"/>
                                    <span>Gagal mendapatkan akses lokasi</span>
                                </div>
                            </div> : null
                           }
                           
                        </div>
                    </div>
                </div>
                <div className='divider'></div>
               
               {
                location.coordinates?.lat && location.coordinates?.lng ?  
                    <div className='flex justify-end mb-10'>
                        <button className='btn btn-primary normal-case w-full md:w-auto' type='submit'>Simpan Alamat</button>
                    </div>
                    :
                    <div className='flex justify-end mb-10'>
                        <button className='btn btn-disabled normal-case w-full md:w-auto' type='submit' disabled>Simpan Alamat</button>
                    </div>
               }
            </form>
        </div>
    </>
  )
}
