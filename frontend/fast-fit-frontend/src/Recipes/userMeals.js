import React, { useState } from 'react';

function UserMeals() {
    return (
        <div>
            <h1 className="text-center">My Meals</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Recipe</th>
                    <th>Meal Type</th>
                    <th>Date</th>
                    <th>Image</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}

export default UserMeals