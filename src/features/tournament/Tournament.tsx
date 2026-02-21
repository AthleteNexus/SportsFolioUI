import React, { useEffect, useState } from "react";
import { fetchTournaments } from "@/api/tournamentService";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";

const Tournament: React.FC = () => {
	const [tournaments, setTournaments] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchTournaments().then((data) => {
			setTournaments(data);
			setLoading(false);
		});
	}, []);

	if (loading)
		return (
			<Card className="max-w-xl mx-auto mt-8 p-0">
				<CardHeader>
					<CardTitle>Tournaments</CardTitle>
				</CardHeader>
				<div className="flex flex-col items-center py-8 gap-2">
					<Spinner size={28} />
					<span>Loading tournaments...</span>
				</div>
			</Card>
		);

	return (
		<Card className="max-w-xl mx-auto mt-8 p-0">
			<CardHeader>
				<CardTitle>Tournaments</CardTitle>
			</CardHeader>
			<div className="px-6 pb-6">
				{tournaments.length === 0 && (
					<Alert variant="default" className="mb-4">
						No tournaments yet.
					</Alert>
				)}
				<div className="space-y-6">
					{tournaments.map((t) => (
						<Card key={t.id} className="p-4">
							<div className="mb-2 font-semibold">{t.name}</div>
							<div className="mb-2">Sport: {t.sport}</div>
							<div className="mb-2">Format: {t.format}</div>
							<div className="mb-2">
								Participants: {t.participants?.length || 0}
							</div>
							<div className="mb-2">
								Organizers: {t.organizers?.length || 0}
							</div>
							<Separator className="my-2" />
						</Card>
					))}
				</div>
			</div>
		</Card>
	);
};

export default Tournament;
