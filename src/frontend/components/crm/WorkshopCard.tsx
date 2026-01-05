'use client';

import React from 'react';
import { Workshop } from '@/frontend/actions/crm.actions';
import { Card, CardContent, CardFooter } from '@/frontend/components/ui/card';
import { Badge } from '@/frontend/components/ui/badge';
import { Button } from '@/frontend/components/ui/button';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface WorkshopCardProps {
    workshop: Workshop;
}

export const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop }) => {
    const isUpcoming = new Date(workshop.date) > new Date();

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-600 relative p-4">
                <Badge 
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-0"
                >
                    {workshop.status === 'published' ? 'Publicado' : 'Borrador'}
                </Badge>
                <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs font-medium opacity-90 mb-1">Taller Presencial</p>
                    <h3 className="text-lg font-bold leading-none">{workshop.title}</h3>
                </div>
            </div>
            <CardContent className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>
                        {new Date(workshop.date).toLocaleDateString('es-CL', {
                            weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
                        })}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{workshop.enrolledCount} / {workshop.capacity} inscritos</span>
                </div>
                 {/* Progress Bar */}
                 <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                    <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all" 
                        style={{ width: `${Math.min(100, (workshop.enrolledCount / workshop.capacity) * 100)}%` }}
                    />
                </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50/50 dark:bg-zinc-900/50 p-4">
                <Button className="w-full" asChild variant={isUpcoming ? "default" : "secondary"}>
                    <Link href={`/admin/crm/workshops/${workshop.id}`}>
                        {isUpcoming ? 'Gestionar Asistencia' : 'Ver Detalles'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};
