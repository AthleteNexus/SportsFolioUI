import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "@/api/profileService";
import type { User } from "@/models/User";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";

const Profile: React.FC<{ userId?: number }> = ({ userId = 1 }) => {
	const [profile, setProfile] = useState<User | null>(null);
	const [editing, setEditing] = useState(false);
	const [form, setForm] = useState({ name: "", bio: "" });

	useEffect(() => {
		fetchProfile(userId).then((data) => {
			setProfile(data);
			if (data) setForm({ name: data.name, bio: data.bio });
		});
	}, [userId]);

	const handleEdit = () => setEditing(true);
	const handleCancel = () => {
		setEditing(false);
		if (profile) setForm({ name: profile.name, bio: profile.bio });
	};
	const handleSave = async () => {
		if (!profile) return;
		const updated = await updateProfile(profile.id, form);
		setProfile(updated);
		setEditing(false);
	};

	if (!profile)
		return (
			<Card className="max-w-xl mx-auto mt-8 p-0">
				<CardHeader>
					<CardTitle>Profile</CardTitle>
				</CardHeader>
				<div className="flex flex-col items-center py-8 gap-2">
					<Spinner size={28} />
					<span>Loading profile...</span>
				</div>
			</Card>
		);

	return (
		<Card className="max-w-xl mx-auto mt-8 p-0">
			<CardHeader>
				<CardTitle>Profile</CardTitle>
			</CardHeader>
			<div className="px-6 pb-6">
				{editing ? (
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
							<Button onClick={handleSave}>Save</Button>
							<Button variant="outline" onClick={handleCancel}>
								Cancel
							</Button>
						</div>
					</div>
				) : (
					<div className="space-y-2">
						<div>
							<span className="font-semibold">Name:</span>{" "}
							{profile.name}
						</div>
						<div>
							<span className="font-semibold">Bio:</span>{" "}
							{profile.bio}
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
