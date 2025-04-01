import { useEffect, useState } from "react";
import { Recipe, User } from "../types";
import { useAuth } from "../context/AuthContext"

/*
    allergen
    baby
    disease?
    recipe
    user
*/


export default function Admin() {
    const [users, setUsers] = useState<User[]>([]);
    const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
    // const [babies, setBabies] = useState<Baby[]>([]);
    // const [diseases, setDiseases] = useState<Disease[]>([]);
    // const [allergens, setAllergens] = useState<Allergen[]>([]);

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const { token } = useAuth();

    useEffect(() => {
        obtainAllUsers();
        obtainAllRecommendedRecipes();
        // obtainAllBabies();
        // obtainAllDiseases();
        // obtainAllAllergens();
    }, []);

    const obtainAllUsers = async (): Promise<boolean> => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/users/all`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const usersData = await response.json();
                setUsers(usersData);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error fetching recipes: ', error);
            setUsers([]);
            return false;
        }
    };

    const obtainAllRecommendedRecipes = async (): Promise<boolean> => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/recipes/recommended`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const recipesData = await response.json();
                setRecommendedRecipes(recipesData);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error fetching recipes: ', error);
            setRecommendedRecipes([]);
            return false;
        }
    };

    return (
        <></>
    );
}