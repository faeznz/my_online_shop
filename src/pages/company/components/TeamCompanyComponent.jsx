import React, { useEffect, useState } from 'react';
import supabase from '../../../utils/supabaseConfig';
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const TeamCompanyComponent = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('team').select('*'); // Assuming you have a 'team' table
            if (error) {
                console.error('Error fetching team members:', error);
            } else {
                setTeamMembers(data);
            }
            setLoading(false);
        };

        fetchTeamMembers();
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Our team
                    </h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        {/* You can fetch this text from Supabase as well if needed */}
                        Tim kebanggan kami 
                    </p>
                </div>
                {loading ? (
                    <div className="text-center"></div>
                ) : (
                    <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="text-center text-gray-500 dark:text-gray-400">
                                <img
                                    className="mx-auto mb-4 w-36 h-36 rounded-full"
                                    src={member.url_image || 'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'}
                                    alt={`${member.name} Avatar`}
                                />
                                <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a href="#">{member.name}</a>
                                </h3>
                                <ul className="flex justify-center mt-4 space-x-4">
                                    <li>
                                        <a href={member.whatsapp || '#'} className="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                                            <IoLogoWhatsapp />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={member.instagram || '#'} className="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                                            <AiFillInstagram />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={member.facebook || '#'} className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                                            <FaFacebook />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TeamCompanyComponent;