import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { authApi } from '../api/authApi';
import { RootState } from '../store';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('admin@tiffinpro.com');
    const [password, setPassword] = useState('Admin@123');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const data = await authApi.login(email, password);
            dispatch(loginSuccess(data));
        } catch (err: any) {
            dispatch(loginFailure(err.message || 'Authentication failed'));
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900/50 backdrop-blur-xl p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl">
                <div className="text-center space-y-2">
                    <div className="size-16 bg-primary rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl shadow-primary/20 mb-6">
                        <span className="material-symbols-outlined text-[32px] font-bold">corporate_fare</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Admin Access</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">Enter your registry credentials</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 animate-shake">
                            <span className="material-symbols-outlined text-red-500 text-[20px]">error</span>
                            <p className="text-xs font-bold text-red-600 uppercase tracking-widest">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4 text-left">
                        <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Terminal</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                                    <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all transition-duration-200"
                                    placeholder="admin@tiffinpro.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Key</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </span>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all transition-duration-200"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="size-4 text-primary focus:ring-primary border-slate-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                Keep Session
                            </label>
                        </div>
                        <div className="text-xs">
                            <a href="#" className="font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">Forgot Pass?</a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full h-12 flex justify-center items-center px-4 border border-transparent text-xs font-black uppercase tracking-[0.2em] rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-xl shadow-primary/20 disabled:opacity-70"
                    >
                        {loading ? (
                            <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            'Verify Identity'
                        )}
                    </button>
                </form>

                <p className="mt-8 text-center text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                    Internal Access Only • Tiffin Admin v1.0.4
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
