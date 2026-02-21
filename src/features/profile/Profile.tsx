import React, { useEffect, useState } from "react";
import type { User } from "@/models/User";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { useAuth } from "@/app/AuthContext";
import usersData from "@/mock-data/data.json";

const Profile: React.FC = () => {
	const { user, login } = useAuth();
	const [editing, setEditing] = useState(false);
	const [form, setForm] = useState({
		name: user?.name || "",
		bio: user?.bio || "",
	});
	const [saving, setSaving] = useState(false);

	const handleEdit = () => setEditing(true);
	const handleCancel = () => {
		setEditing(false);
		setForm({ name: user?.name || "", bio: user?.bio || "" });
	};
	const handleSave = async () => {
		setSaving(true);
		if (!user) return;
		const updatedUser = { ...user, name: form.name, bio: form.bio };
		login(updatedUser, String(updatedUser.id));
		let allUsers = usersData.users.map((u: User) =>
			u.id === updatedUser.id ? updatedUser : u
		);
		localStorage.setItem("users", JSON.stringify(allUsers));
		setSaving(false);
		setEditing(false);
	};

	return (
		<Card className="max-w-xl mx-auto mt-8 p-0">
			<CardHeader>
				<CardTitle>Profile</CardTitle>
			</CardHeader>
			<div className="px-6 pb-6">
				{!user ? (
					<div className="flex flex-col items-center py-8 gap-2">
						<Spinner size={28} />
						<span>Loading profile...</span>
					</div>
				) : editing ? (
					<div className="space-y-4">
						<div>
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								type="text"
								value={form.name}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										name: e.target.value,
									}))
								}
								className="mt-1"
							/>
						</div>
						<div>
							<Label htmlFor="bio">Bio</Label>
							<Input
								id="bio"
								type="text"
								value={form.bio}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										bio: e.target.value,
									}))
								}
								className="mt-1"
							/>
						</div>
						<Separator className="my-4" />
						<div className="flex gap-2">
							<Button onClick={handleSave} disabled={saving}>
								{saving ? <Spinner size={18} /> : "Save"}
							</Button>
							<Button variant="outline" onClick={handleCancel}>
								Cancel
							</Button>
						</div>
					</div>
				) : (
					<div className="space-y-2">
						<div>
							<span className="font-semibold">Name:</span>{" "}
							{user.name}
						</div>
						<div>
							<span className="font-semibold">Bio:</span>{" "}
							{user.bio}
						</div>
						<Separator className="my-4" />
						<Button onClick={handleEdit}>Edit Profile</Button>
					</div>
				)}
			</div>
		</Card>
	);
};

export default Profile;
