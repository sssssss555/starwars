import React, { useEffect, useState } from "react";
import { UIKIT } from "../../components";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import * as APIs from "../../apis";
import * as Models from "../../models";
import Astronaut from "../../assets/astronaut.svg";

export const Profile = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<Models.User>();
    const params = useParams();

    useEffect(() => {
        if (params.username) {
            Promise.all([
                APIs.users().getUserInfo(params.username)]).then(result => {
                    setProfile(() => result[0]);

                }).finally(() => {
                    setLoading(() => false);
                });

        }
    }, [params.username]);

    const classes = {
        root: "profile-page",
        info: {
            root: "profile-page-info",
            avatar: "profile-page-info-avatar",
            name: "profile-page-info-name",
            username: "profile-page-info-username",
        },
        repos: "profile-page-repos-list",
        repo: {
            root: "profile-page-repos-list-item",
            name: "profile-page-repos-list-item-name",
            description: "profile-page-repos-list-item-description"
        }
    }


    return (
        <div className={classes.root}>
            <div className={classes.info.root}>
                <div>
                    <UIKIT.Avatar className={classes.info.avatar} image={Astronaut} />
                </div>
                <div>
                    {loading ? <Skeleton width="10vw" count={3} /> : (
                        
                        <h1>
                            <div className={classes.info.name}>Name : {profile?.name}</div>
                            <div className={classes.info.username}>Gender : {profile?.gender}</div>
                        
                        <div className={classes.info.username}>Height: {profile?.height}</div>
                        <div className={classes.info.username}>Mass: {profile?.mass}</div>
                        <div className={classes.info.username}>Hair Color: {profile?.hair_color}</div>
                        <div className={classes.info.username}>Skin Color: {profile?.skin_color}</div>
                        <div className={classes.info.username}>Eye Color: {profile?.eye_color}</div>
                        <div className={classes.info.username}>Birth Year: {profile?.birth_year}</div>
                        <div className={classes.info.username}>HomeWorld: {profile?.homeworld}</div>
                        <div className={classes.info.username}>Url: {profile?.url}</div>
                        </h1>
                    )}
                </div>
            </div>
            <div className={classes.repos}>
                <h2>Films</h2>
                <ul >
                    {loading ? <Skeleton className={classes.repo.root} count={3} /> : (
                        <>
                            {React.Children.toArray(profile?.films.map((film: String) => {
                                return (
                                    <li className={classes.repo.root}>
                                        <p className={classes.repo.description}>{film}</p>
                                    </li>
                                )
                            }))}
                        </>
                    )}
                </ul>
            </div>
            <div className={classes.repos}>
                <h2>Species</h2>
               {profile?.species !== undefined && <ul >
                    {loading ? <Skeleton className={classes.repo.root} count={3} /> : (
                        <>
                            {React.Children.toArray(profile?.species.map((spec: String) => {
                                return (
                                    <li className={classes.repo.root}>
                                        <p className={classes.repo.description}>{spec}</p>
                                    </li>
                                )
                            }))}
                        </>
                    )}
                </ul>}
            </div>
            <div className={classes.repos}>
                <h2>Vehicles</h2>
                <ul >
                    {loading ? <Skeleton className={classes.repo.root} count={3} /> : (
                        <>
                            {React.Children.toArray(profile?.vehicles.map((film: String) => {
                                return (
                                    <li className={classes.repo.root}>
                                        <p className={classes.repo.description}>{film}</p>
                                    </li>
                                )
                            }))}
                        </>
                    )}
                </ul>
            </div>
            <div className={classes.repos}>
                <h2>Starships</h2>
               { profile?.starships && <ul >
                    {loading ? <Skeleton className={classes.repo.root} count={3} /> : (
                        <>
                            {React.Children.toArray(profile?.starships.map((film: String) => {
                                return (
                                    <li className={classes.repo.root}>
                                        <p className={classes.repo.description}>{film}</p>
                                    </li>
                                )
                            }))}
                        </>
                    )}
                </ul>}
            </div>
        </div>
    );
}